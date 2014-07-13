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

/**
 * Shortcut for executing script code in the inject/inject.js
 * @param sCode
 */
function injectScriptCode( sCode, callback )
{
    var callback = callback || function() {};

    chrome.tabs.executeScript(
        {
            code: sCode
        },
        callback
    );
}

$( function()
    {
        /*
         * i18n translator
         */
        $( '[data-i18n]' ).each( function()
            {
                $( this ).text( chrome.i18n.getMessage( this.getAttribute( 'data-i18n' ) ) );
            }
        );

        $( '*[title^="__MSG_"]' ).each( function()
            {
                // Finding i18n string in the title attribute
                var aI18nString = /__MSG_(.*)__/.exec( this.getAttribute( 'title' ) );

                if( aI18nString != null )
                {
                    $( this ).attr( 'title', chrome.i18n.getMessage( aI18nString[ 1 ] ) );
                }
            }
        );

        /*
         * tooltips
         */
        $( '.has-tooltip' ).tooltip();

        /*
         * GUI events
         */
        $( '.page_action_headbar small a' ).click( function()
            {
                chrome.tabs.create( { url: 'http://www.digidesk.de/' } );
                return false;
            }
        );

        $( '#toggle-gui' ).click( function()
            {
                injectScriptCode( 'oPageLiner.toggleGUI()', null );
            }
        );

        $( '#add-helpline-x' ).click( function()
            {
                injectScriptCode( 'oPageLiner.addHelpLine( 100, 0 )', null );
                refreshHelpLineListing();
            }
        );

        $( '#add-helpline-y' ).click( function()
            {
                injectScriptCode( 'oPageLiner.addHelpLine( 0, 100 )', null );
                refreshHelpLineListing();
            }
        );

        $( '#remove-helplines' ).click( function()
            {
                injectScriptCode( 'oPageLiner.removeAllHelpLines()', null );
                refreshHelpLineListing();
            }
        );

        function refreshHelpLineListing()
        {
            injectScriptCode( 'oPageLiner.getAllHelpLines()', function( oAllHelpLines )
                {
                    var $oHelpLineActions        = $( '#helpline-actions' ),
                        $oHelpLineActionsDivider = $( '#helpline-actions-divider' );

                    oAllHelpLines = oAllHelpLines[ 0 ];

                    if( oAllHelpLines.length > 0 )
                    {
                        var $oHelpLineListing = $oHelpLineActions.find( '.listing' );

                        $oHelpLineActionsDivider.removeClass( 'hidden' );
                        $oHelpLineActions.removeClass( 'hidden' );
                        $oHelpLineListing.html( '' );

                        $.each( oAllHelpLines, function( x,y )
                            {
                                var oRowElem         = document.createElement( 'div' ),
                                    oCol1Elem        = document.createElement( 'div' ),
                                    oCol2Elem        = document.createElement( 'div' ),
                                    oColorPickerElem = document.createElement( 'input' ),
                                    oDeleteElem      = document.createElement( 'strong' );

                                oRowElem.className = 'row';
                                oRowElem.setAttribute( 'data-id', x );

                                oCol1Elem.className = 'col-xs-6';
                                oCol1Elem.innerHTML = '#' + ( x + 1 );

                                oCol2Elem.className    = 'col-xs-6 text-right';
                                oColorPickerElem.type  = 'color';
                                oColorPickerElem.value = y.sColor;
                                oColorPickerElem.setAttribute( 'data-id', x );
                                oCol2Elem.appendChild( oColorPickerElem );

                                $( oColorPickerElem ).change( function()
                                    {
                                        injectScriptCode( 'oPageLiner.editHelpLine( ' + this.getAttribute( 'data-id' ) + ', null, null, "' + this.value + '" )', null );
                                    }
                                );

                                oDeleteElem.className = 'delete text-danger';
                                oDeleteElem.innerHTML = '&times;';
                                oDeleteElem.setAttribute( 'data-id', x );
                                oCol2Elem.appendChild( oDeleteElem );
                                $( oDeleteElem ).click( function()
                                    {
                                        injectScriptCode( 'oPageLiner.deleteHelpline( ' + this.getAttribute( 'data-id' ) + ' )', null );
                                        refreshHelpLineListing();
                                    }
                                );

                                oRowElem.appendChild( oCol1Elem );
                                oRowElem.appendChild( oCol2Elem );

                                $oHelpLineActions.find( '.listing' ).append( oRowElem );
                            }
                        )
                    }
                    else
                    {
                        $oHelpLineActionsDivider.addClass( 'hidden' );
                        $oHelpLineActions.addClass( 'hidden' );
                    }
                }
            );
        }
        refreshHelpLineListing();
    }
);