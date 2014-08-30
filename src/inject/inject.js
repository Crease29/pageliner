/**
 *
 *     |o     o    |          |
 * ,---|.,---..,---|,---.,---.|__/
 * |   |||   |||   ||---'`---.|  \
 * `---'``---|``---'`---'`---'`   `
 *       `---'    [media solutions]
 *
 * @copyright   (c) digidesk - media solutions
 * @link        http://www.digidesk.de
 * @author      Kai
 * @version     SVN: $Id$
 */

var oPageLiner = {
    sDefaultColor: '#33ffff'
};

function debug( sMsg )
{
    if( localStorage.getItem( 'pglnr-ext-blDebug' ) == "true" )
    {
        console.debug( sMsg );
    }
}

oPageLiner.init = function()
{
    debug( '[PageLiner] Initializing extension...' );

    if( localStorage.getItem( 'pglnr-ext-blIsActive' ) == 'true' )
    {
        var aHelpLines = this.getAllHelpLines();

        debug( '[PageLiner] Helplines found! Rendering...' );

        this.showRulers();
        this.updatePopUp();

        // if helplines are to be displayed, render them!
        if( aHelpLines && aHelpLines.length > 0 )
        {
            // add all existing helplines to the DOM
            $.each( aHelpLines, function( iIndex )
                {
                    oPageLiner.addHelpLineToDOM( this.posX, this.posY, this.sColor, iIndex );
                }
            );
        }
    }
    else
    {
        debug( '[PageLiner] No helplines to render.' );
    }

    debug( '[PageLiner] Initializing done.' );
};

oPageLiner.getAllHelpLines = function()
{
    return JSON.parse( localStorage.getItem( 'pglnr-ext-aHelpLines' ) );
};

oPageLiner.setAllHelpLines = function( oAllHelpLines )
{
    return localStorage.setItem( 'pglnr-ext-aHelpLines', JSON.stringify( oAllHelpLines ) );
};

/**
 * Adds a helpline
 *
 * @param double posX   Position of the helpline on the horizontal axis
 * @param double posY   Position of the helpline on the vertical axis
 * @param string sColor HEX color code of the helplines color
 */
oPageLiner.addHelpLine = function( posX, posY, sColor )
{
    var iHelplineIndex = 0;

    // Check if localStorage dataset exists for this URL
    if( localStorage.getItem( 'pglnr-ext-aHelpLines' ) === null )
    {
        localStorage.setItem( 'pglnr-ext-aHelpLines', "[]" );
    }

    // Check if helplines can be displayed
    if( !localStorage.getItem( 'pglnr-ext-blIsActive' ) || localStorage.getItem( 'pglnr-ext-blIsActive' ) == 'false' )
    {
        localStorage.setItem( 'pglnr-ext-blIsActive', true );
        this.init();
    }

    iHelplineIndex = this.addHelpLineToLocalStorage( posX, posY, sColor );
    this.addHelpLineToDOM( posX, posY, sColor, iHelplineIndex );

    this.updatePopUp();
};

/**
 * Adds a helpline to the local storage
 *
 * @param double posX   Position of the helpline on the horizontal axis
 * @param double posY   Position of the helpline on the vertical axis
 * @param string sColor HEX color code of the helplines color
 *
 * @return int iIndex
 */
oPageLiner.addHelpLineToLocalStorage = function( posX, posY, sColor, iHelplineIndex )
{
    var oHelpLine =
            {
                posX: typeof posX != 'undefined' ? posX : 0,
                posY: typeof posY != 'undefined' ? posY : 0,
                sColor: typeof sColor != 'undefined' ? sColor : this.sDefaultColor
            },
        aHelpLines = this.getAllHelpLines(),
        iIndex = 0;

    // If updating an existing helpline
    if( typeof iHelplineIndex != 'undefined' )
    {
        aHelpLines[ iHelplineIndex ] = oHelpLine;
        iIndex = iHelplineIndex;
    }
    else
    {
        iIndex = aHelpLines.push( oHelpLine );
    }

    localStorage.setItem( 'pglnr-ext-aHelpLines', JSON.stringify( aHelpLines ) );

    return iIndex - 1;
};

oPageLiner.addHelpLineToDOM = function( posX, posY, sColor, iHelplineIndex )
{
    var oHelpLine =
            {
                posX: typeof posX != 'undefined' && typeof posY != 'undefined' ? posX : 0,
                posY: typeof posY != 'undefined' || !posX ? posY : 0,
                sColor: typeof sColor != 'undefined' ? sColor : this.sDefaultColor
            },
        oHelpLineElem = document.createElement( 'div' ),
        oHelpLineTooltipElem = document.createElement( 'div' ),
        sAxis = ( oHelpLine.posX > 0 ? 'x' : 'y' );

    oHelpLineElem.className = 'pglnr-ext-helpline pglnr-ext-helpline-' + sAxis;
    oHelpLineElem.style.backgroundColor = oHelpLine.sColor;
    oHelpLineElem.setAttribute( 'data-pglnr-ext-helpline-index', iHelplineIndex );

    oHelpLineTooltipElem.className = 'pglnr-ext-helpline-tooltip pglnr-ext-helpline-tooltip-' + sAxis;
    oHelpLineTooltipElem.iHelplineIndex = iHelplineIndex;
    oHelpLineTooltipElem.setTooltipText = function( sText )
    {
        this.innerHTML = '#' + ( this.iHelplineIndex + 1 ) + ': ' + ( sText | 0 ) + 'px';
    };

    if( oHelpLine.posX > 0 )
    {
        oHelpLineElem.style.position = "fixed";
        oHelpLineElem.style.left = oHelpLine.posX + "px";
        oHelpLineTooltipElem.setTooltipText( oHelpLine.posX );
    }
    else
    {
        oHelpLineElem.style.position = "absolute";
        oHelpLineElem.style.top = oHelpLine.posY + "px";
        oHelpLineTooltipElem.setTooltipText( oHelpLine.posY );
    }

    $( oHelpLineElem ).draggable(
        {
            axis: sAxis,
            start: function( event, ui )
                {
                    oHelpLineTooltipElem.style.display = 'block';
                },
            drag: function( event, ui )
                {
                    oHelpLineTooltipElem.setTooltipText( ( sAxis == 'x' ? ui.position.left : ui.position.top ) );
                },
            stop: function( event, ui )
                {
                    // Updating helpline position in localstorage
                    if( sAxis == 'x' )
                    {
                        oPageLiner.addHelpLineToLocalStorage( ui.position.left, 0, oHelpLine.sColor, iHelplineIndex )
                    }
                    else
                    {
                        oPageLiner.addHelpLineToLocalStorage( 0, ui.position.top, oHelpLine.sColor, iHelplineIndex )
                    }

                    oHelpLineTooltipElem.style.display = 'none';
                }
        }
    ).append( oHelpLineTooltipElem );

    $( 'body' ).append( oHelpLineElem );
};

oPageLiner.editHelpLine = function( iHelplineIndex, posX, posY, sColor )
{
    var oAllPageLines = this.getAllHelpLines(),
        $oPageLine    = $( '.pglnr-ext-helpline[data-pglnr-ext-helpline-index="' + iHelplineIndex + '"]' );

    if( $oPageLine.length )
    {
        if( posX )
        {
            oAllPageLines[ iHelplineIndex ].posX = posX;
        }

        if( posY )
        {
            oAllPageLines[ iHelplineIndex ].posY = posY;
        }

        if( sColor )
        {
            oAllPageLines[ iHelplineIndex ].sColor = sColor;
            this.sDefaultColor = sColor;
        }

        $oPageLine.remove();
        this.addHelpLineToDOM( oAllPageLines[ iHelplineIndex ].posX, oAllPageLines[ iHelplineIndex ].posY, oAllPageLines[ iHelplineIndex ].sColor, iHelplineIndex );
        this.setAllHelpLines( oAllPageLines );
    }
};

oPageLiner.deleteHelpline = function( iHelplineIndex )
{
    var oAllPageLines = this.getAllHelpLines(),
        $oPageLine    = $( '.pglnr-ext-helpline[data-pglnr-ext-helpline-index="' + iHelplineIndex + '"]' );

    if( $oPageLine.length )
    {
        delete oAllPageLines.splice( iHelplineIndex, 1 );
        this.setAllHelpLines( oAllPageLines );
        $( '.pglnr-ext-helpline' ).remove();
        this.init();
    }
};

oPageLiner.toggleGUI = function( blForceState )
{
    var blState = null;

    if( blForceState === true || blForceState === false )
    {
        blState = blForceState;
    }
    else
    {
        blState = localStorage.getItem( 'pglnr-ext-blIsActive' ) == 'false' ? true : false;
    }

    localStorage.setItem( 'pglnr-ext-blIsActive', blState );

    if( $( '.pglnr-ext-ruler' ).length > 0 )
    {
        $( '.pglnr-ext-ruler, .pglnr-ext-helpline' ).toggle( blState );
    }
    else
    {
        this.init();
    }
};

oPageLiner.removeAllHelpLines = function()
{
    $( '.pglnr-ext-helpline' ).remove();
    this.toggleGUI( false );
    localStorage.setItem( 'pglnr-ext-aHelpLines', "[]" );
    this.sDefaultColor = '#33ffff';
    this.updatePopUp();
};

oPageLiner.showRulers = function()
{
    var $oRulerTop  = $( '.pglnr-ext-ruler.pglnr-ext-ruler-top' ),
        $oRulerLeft = $( '.pglnr-ext-ruler.pglnr-ext-ruler-left' );

    if( $oRulerTop.length > 0 && $oRulerLeft.length > 0 )
    {
        $oRulerTop.show();
        $oRulerLeft.show();
    }
    else
    {
        var oRulerTopElem     = document.createElement( 'div' ),
            oRulerLeftElem    = document.createElement( 'div' ),
            oRulerTopMeasure  = document.createElement( 'ul' ),
            oRulerLeftMeasure = document.createElement( 'ul' ),
            iDocumentWidth    = $( document ).width(),
            iDocumentHeight   = $( document ).height();

        oRulerTopElem.className  = 'pglnr-ext-ruler pglnr-ext-ruler-top';
        oRulerLeftElem.className = 'pglnr-ext-ruler pglnr-ext-ruler-left';

        oRulerTopMeasure.style.width   = iDocumentWidth * 2 + "px";
        oRulerLeftMeasure.style.height = iDocumentHeight * 2 + "px";

        // Create measurement for oRulerTopElem
        for( var i = 0; i <= Math.ceil( iDocumentWidth / 100 ); i++ )
        {
            var oMeasurementElem = document.createElement( 'li' );
            oMeasurementElem.innerText = ( i > 0 ? i * 100 : " " );
            oRulerTopMeasure.appendChild( oMeasurementElem );
        }
        oRulerTopElem.appendChild( oRulerTopMeasure );

        // Create measurement for oRulerLeftElem
        for( var i = 0; i <= Math.ceil( iDocumentHeight / 100 ); i++ )
        {
            var oMeasurementElem = document.createElement( 'li' );
            oMeasurementElem.innerText = ( i > 0 ? i * 100 : " " );
            oRulerLeftMeasure.appendChild( oMeasurementElem );
        }
        oRulerLeftElem.appendChild( oRulerLeftMeasure );

        $( 'body' ).append( oRulerTopElem, oRulerLeftElem );

        $( window ).scroll( function()
            {
                var iDocumentHeight = $( document ).height();

                $( oRulerLeftMeasure ).css(
                    {
                        height: iDocumentHeight,
                        top: $( this ).scrollTop() * -1
                    }
                ).children().remove();

                // Create measurement for oRulerLeftElem
                for( var i = 0; i <= Math.ceil( iDocumentHeight / 100 ); i++ )
                {
                    var oMeasurementElem = document.createElement( 'li' );
                    oMeasurementElem.innerText = ( i > 0 ? i * 100 : " " );
                    oRulerLeftMeasure.appendChild( oMeasurementElem );
                }
                oRulerLeftElem.appendChild( oRulerLeftMeasure );
            }
        );
    }
};

oPageLiner.updatePopUp = function()
{
    debug( '[PageLiner] Setting count badge...' );
    chrome.extension.sendMessage( null, { sAction: 'updatePopUp', oAllHelpLines: this.getAllHelpLines() } );
};

// Init PageLiner object
oPageLiner.init();