/**
 * PageLiner
 *
 * @copyright   Kai Neuwerth - 2017
 * @link        http://www.neuland-netz.de
 * @author      Kai Neuwerth
 */

var oPageLiner = {
    sDefaultColor: '#33ffff',
    blAltKeyReleased: true
};

function debug( sMsg )
{
    if( localStorage.getItem( 'pglnr-ext-blDebug' ) == "true" )
    {
        console.log( sMsg );
    }
}

chrome.runtime.onMessage.addListener(
    function( request, sender, sendResponse )
    {
        if( request.sAction == 'getGuiStatus' )
        {
            sendResponse( { 'localStorage': localStorage } );
        }
    }
);

oPageLiner.init = function()
{
    debug( '[PageLiner] Initializing extension...' );

    var aHelpLines = this.getAllHelpLines();

    if( typeof aHelpLines !== 'undefined')
    {
        debug( '[PageLiner] Helplines found! Updating badge...' );
        this.updatePopUp();

        if( localStorage.getItem( 'pglnr-ext-blIsActive' ) == 'true')
        {
            debug( '[PageLiner] Rendering helplines...' );

            this.drawRulers();
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
 * @param posX   double  Position of the helpline on the horizontal axis
 * @param posY   double  Position of the helpline on the vertical axis
 * @param sColor string  HEX color code of the helplines color
 */
oPageLiner.addHelpLine = function( posX, posY, sColor )
{
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

    var oHelpLine = this.addHelpLineToDOM( posX, posY, sColor, this.addHelpLineToLocalStorage( posX, posY, sColor ) );

    this.updatePopUp();

    return oHelpLine;
};

/**
 * Adds a helpline to the local storage
 *
 * @param  posX           doublePosition of the helpline on the horizontal axis
 * @param  posY           doublePosition of the helpline on the vertical axis
 * @param  sColor         stringHEX color code of the helplines color
 * @param  iHelplineIndex number of the helpline
 *
 * @return int iIndex
 */
oPageLiner.addHelpLineToLocalStorage = function( posX, posY, sColor, iHelplineIndex )
{
    var oHelpLine =
            {
                posX:   typeof posX   != 'undefined' ? posX : 0,
                posY:   typeof posY   != 'undefined' ? posY : 0,
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
    var $window   = $( window ),
        oHelpLine =
            {
                posX:   typeof posX   != 'undefined' && typeof posY != 'undefined' ? posX : 0,
                posY:   typeof posY   != 'undefined' || !posX ? posY : 0,
                sColor: typeof sColor != 'undefined' ? sColor : this.sDefaultColor
            },
        oHelpLineElem        = document.createElement( 'div' ),
        oHelpLineTooltipElem = document.createElement( 'div' ),
        sAxis                = ( oHelpLine.posX > 0 ? 'x' : 'y' );

    oHelpLineElem.className             = 'pglnr-ext-helpline pglnr-ext-helpline-' + sAxis;
    oHelpLineElem.style.backgroundColor = oHelpLine.sColor;
    oHelpLineElem.setAttribute( 'data-pglnr-ext-helpline-index', iHelplineIndex );

    oHelpLineTooltipElem.className      = 'pglnr-ext-helpline-tooltip pglnr-ext-helpline-tooltip-' + sAxis;
    oHelpLineTooltipElem.iHelplineIndex = iHelplineIndex;
    oHelpLineTooltipElem.setTooltipText = function( sText )
    {
        this.innerHTML = '#' + ( this.iHelplineIndex + 1 ) + ': ' + ( sText | 0 ) + 'px';
    };

    if( oHelpLine.posX > 0 )
    {
        oHelpLineElem.style.position = "fixed";
        oHelpLineElem.style.left     = oHelpLine.posX + "px";
        oHelpLineTooltipElem.setTooltipText( oHelpLine.posX );
    }
    else
    {
        oHelpLineElem.style.position = "absolute";
        oHelpLineElem.style.top      = oHelpLine.posY + "px";
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
    ).on( 'mouseenter', function( e )
        {
            $window.on( 'keydown', {iHelplineIndex: iHelplineIndex, mouseX: e.clientX, mouseY: e.clientY}, oPageLiner.drawDistanceLines);
            $window.on( 'keyup', oPageLiner.removeDistanceLines);
        }
    ).on( 'mouseleave', function( e )
        {
            oPageLiner.removeDistanceLines();
            $window.unbind( 'keydown', oPageLiner.drawDistanceLines );
            $window.unbind( 'keyup', oPageLiner.removeDistanceLines );
        }
    ).on( 'drag', function()
        {
            oPageLiner.removeDistanceLines();
        }
    ).append( oHelpLineTooltipElem );

    $( 'body' ).append( oHelpLineElem );

    return oHelpLineElem;
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
        this.addHelpLineToDOM(
            oAllPageLines[ iHelplineIndex ].posX,
            oAllPageLines[ iHelplineIndex ].posY,
            oAllPageLines[ iHelplineIndex ].sColor,
            iHelplineIndex
        );
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
        blState = localStorage.getItem( 'pglnr-ext-blIsActive' ) == 'false';
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

oPageLiner.drawRulers = function()
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
            iDocumentHeight   = $( document ).height(),
            $window           = $( window );

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

        // Add drag event to create new helplines from ruler
        $( oRulerTopElem ).draggable(
            {
                axis:  "y",
                cursorAt: "bottom",
                distance: 20,
                helper: function ( event )
                        {
                            var $oHelpLine = $( oPageLiner.addHelpLine( 0, event.clientY + $window.scrollTop() ) ).addClass( 'pglnr-ext-helpline-dummy' );
                            this.iHelplineIndex = $oHelpLine.data('pglnr-ext-helpline-index');

                            $oHelpLine.show();

                            return $oHelpLine[ 0 ];
                        },
                stop:  function ( event, ui )
                       {
                           oPageLiner.editHelpLine( this.iHelplineIndex, 0, event.clientY + $window.scrollTop() );
                           $( '.pglnr-ext-helpline-dummy' ).remove();
                       }
            }
        );

        oRulerTopElem.appendChild( oRulerTopMeasure );

        // Create measurement for oRulerLeftElem
        for( var i = 0; i <= Math.ceil( iDocumentHeight / 100 ); i++ )
        {
            var oMeasurementElem = document.createElement( 'li' );
            oMeasurementElem.innerText = ( i > 0 ? i * 100 : " " );
            oRulerLeftMeasure.appendChild( oMeasurementElem );
        }

        // Add drag event to create new helplines from ruler
        $( oRulerLeftElem ).draggable(
            {
                axis:  "x",
                cursorAt: { left: 0 },
                distance: 10,
                helper: function ( event )
                       {
                           var $oHelpLine = $( oPageLiner.addHelpLine( event.clientX, 0 ) ).addClass( 'pglnr-ext-helpline-dummy' );
                           this.iHelplineIndex = $oHelpLine.data( 'pglnr-ext-helpline-index' );

                           $oHelpLine.show();

                           return $oHelpLine[ 0 ];
                       },
                stop:  function ( event, ui )
                       {
                           oPageLiner.editHelpLine( this.iHelplineIndex, event.clientX, 0 );
                           $( '.pglnr-ext-helpline-dummy' ).remove();
                       }
            }
        );

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

oPageLiner.drawDistanceLines = function( event )
{
    if ( !oPageLiner.blAltKeyReleased || event.keyCode !== 17 )
    {
        return;
    }

    oPageLiner.blAltKeyReleased = false;

    var $body                  = $( 'body' ),
        $oPageLine             = $( '.pglnr-ext-helpline[data-pglnr-ext-helpline-index="' + event.data.iHelplineIndex + '"]' ),
        blHorizontal           = $oPageLine.hasClass( 'pglnr-ext-helpline-y' ),
        sOrigin                = blHorizontal ? 'top' : 'left',
        sScaleOrigin           = blHorizontal ? 'height' : 'width',
        sModifierClass         = blHorizontal ? 'pglnr-ext-distanceline-y' : 'pglnr-ext-distanceline-x',
        iClosestLowerPos       = oPageLiner.getLowerClosestHelpLine( parseInt( $oPageLine.css( sOrigin ) ), blHorizontal ),
        iClosestUpperPos       = oPageLiner.getUpperClosestHelpLine( parseInt( $oPageLine.css( sOrigin ) ), blHorizontal ),
        iClosestLowerDimension = parseInt( $oPageLine.css( sOrigin ) ) - iClosestLowerPos,
        iClosestUpperDimension = iClosestUpperPos - parseInt( $oPageLine.css( sOrigin ) ) - 1,
        iDimensionLineLeftPos  = ( blHorizontal ? 'left: ' + ( event.data.mouseX + 20 ) + 'px;' : '' ),
        $oLowerDistanceLine    = $( '<div></div>', {
                                     'class': 'pglnr-ext-distanceline ' + sModifierClass,
                                     'style': sOrigin + ': ' + ( iClosestLowerPos + 1 ) + 'px; ' +
                                              sScaleOrigin + ': ' + ( iClosestLowerDimension - 1 ) + 'px;' +
                                              iDimensionLineLeftPos
                                 } ).html('<span>' + ( iClosestLowerDimension ) + 'px</span>'),
        $oUpperDistanceLine    = $( '<div></div>', {
                                     'class': 'pglnr-ext-distanceline ' + sModifierClass,
                                     'style': sOrigin + ': ' + ( parseInt( $oPageLine.css( sOrigin ) ) + 1)  + 'px; ' +
                                              sScaleOrigin + ': ' + ( iClosestUpperDimension - 1 ) + 'px;' +
                                              iDimensionLineLeftPos
                                 } ).html('<span>' + ( iClosestUpperDimension + 1 ) + 'px</span>');

    $body.append( $oLowerDistanceLine, $oUpperDistanceLine );
};

/**
 * Finds the lower closest help line by a given position
 *
 * @param iPos int
 * @param blOnYAxis bool
 *
 * @return int
 */
oPageLiner.getLowerClosestHelpLine = function( iPos, blOnYAxis )
{
    var aHelpLines          = this.getAllHelpLines(),
        iClosestHelplinePos = 0;

    blOnYAxis = blOnYAxis || false;

    $.each( aHelpLines, function( iHelplineIndex, oHelpline )
        {
            if ( blOnYAxis )
            {
                if( oHelpline.posY < iPos && oHelpline.posY > iClosestHelplinePos )
                {
                    iClosestHelplinePos = oHelpline.posY;
                }
            }
            else
            {
                if( oHelpline.posX < iPos && oHelpline.posX > iClosestHelplinePos )
                {
                    iClosestHelplinePos = oHelpline.posX;
                }
            }
        }
    );

    return iClosestHelplinePos;
};

/**
 * Finds the upper closest help line by a given position
 *
 * @param iPos int
 * @param blOnYAxis bool
 *
 * @return int
 */
oPageLiner.getUpperClosestHelpLine = function( iPos, blOnYAxis )
{
    var aHelpLines          = this.getAllHelpLines(),
        $window             = $(window),
        iClosestHelplinePos = parseInt(blOnYAxis ? ( $window.height() + $window.scrollTop() ) : $window.width());

    blOnYAxis = blOnYAxis || false;

    $.each( aHelpLines, function( iHelplineIndex, oHelpline )
        {
            if ( blOnYAxis )
            {
                if( oHelpline.posY > iPos && oHelpline.posY < iClosestHelplinePos )
                {
                    iClosestHelplinePos = oHelpline.posY;
                }
            }
            else
            {
                if( oHelpline.posX > iPos && oHelpline.posX < iClosestHelplinePos )
                {
                    iClosestHelplinePos = oHelpline.posX;
                }
            }
        }
    );

    return iClosestHelplinePos;
};

/**
 * Removes all distance lines from DOM.
 */
oPageLiner.removeDistanceLines = function( event )
{
    if ( !oPageLiner.blAltKeyReleased )
    {
        $( 'body > .pglnr-ext-distanceline' ).remove();
        oPageLiner.blAltKeyReleased = true;
    }
};

oPageLiner.updatePopUp = function()
{
    debug( '[PageLiner] Setting count badge...' );
    chrome.extension.sendMessage( chrome.runtime.id, { sAction: 'updatePopUp', oAllHelpLines: this.getAllHelpLines() } );
};

// Init PageLiner object
oPageLiner.init();

