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

/* ToDo
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse)
    {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function( aTabs ) {
                var iTabId = aTabs[0].id;

                if (request.sAction == "updatePopUp")
                {
                    chrome.browserAction.setBadgeText(
                        {
                            text: '' + JSON.parse( request.localStorage[ 'pglnr-ext-aHelpLines' ] ).length,
                            tabId: iTabId
                        }
                    );
                    chrome.browserAction.setBadgeBackgroundColor(
                        {
                            color: '#3C4E55',
                            tabId: iTabId
                        }
                    )
                    sendResponse( {} );
                }
            }
        );
    }
);
*/


$( function()
{
    /*
     * i18n translator
     */
    $( '[data-i18n]' ).each( function()
    {
        $( this ).text( chrome.i18n.getMessage( this.getAttribute( 'data-i18n' ) ) );
    } );

    $( '*[title^="__MSG_"]' ).each( function()
    {
        // Finding i18n string in the title attribute
        var aI18nString = /__MSG_(.*)__/.exec( this.getAttribute( 'title' ) );

        if( aI18nString != null )
        {
            $( this ).attr( 'title', chrome.i18n.getMessage( aI18nString[ 1 ] ) );
        }
    } );

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
        chrome.extension.sendMessage(
            {
                sAction: "toggle-gui"
            },
            function( response )
            {
            }
        );
    } );

    $( '#add-helpline-x' ).click( function()
    {
        chrome.extension.sendMessage(
            {
                sAction: "set-helpline-x"
            },
            function( response )
            {
            }
        );
    } );

    $( '#add-helpline-y' ).click( function()
    {
        chrome.extension.sendMessage(
            {
                sAction: "set-helpline-y"
            },
            function( response )
            {
            }
        );
    } );

    $( '#remove-helplines' ).click( function()
    {
        chrome.extension.sendMessage(
            {
                sAction: "remove-helplines"
            },
            function( response )
            {
            }
        );
    } );
} );