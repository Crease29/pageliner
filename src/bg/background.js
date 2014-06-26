/**
 * Shortcut for injecting a script file in the current tab
 * @param sFile
 */
function injectScriptFile( sFile )
{
    chrome.tabs.executeScript( null, {
        file: sFile
    });
}

/**
 * Shortcut for executing script code in the inject/inject.js
 * @param sCode
 */
function injectScriptCode( sCode )
{
    chrome.tabs.executeScript({
        code: sCode
    });
}

chrome.extension.onMessage.addListener(
    function( request, sender, sendResponse )
    {
        if( request.sAction )
        {
            switch( request.sAction )
            {
                case "toggle-gui":
                    injectScriptCode( 'oPageLiner.toggleGUI()' );
                    /*injectScriptCode( 'oPageLiner.updatePopUp()' );*/ // ToDo
                    sendResponse( {} ); // sending back empty response to sender
                    break;
                case "set-helpline-x":
                    injectScriptCode( 'oPageLiner.addHelpLine( 100, 0 )' );
                    sendResponse( {} ); // sending back empty response to sender
                    break;
                case "set-helpline-y":
                    injectScriptCode( 'oPageLiner.addHelpLine( 0, 100 )' );
                    sendResponse( {} ); // sending back empty response to sender
                    break;
                case "remove-helplines":
                    injectScriptCode( 'oPageLiner.removeAllHelpLines()' );
                    sendResponse( {} ); // sending back empty response to sender
                    break;
                default:
                    console.debug( "Unmatched request of '" + request + "' from script to background.js from " + sender );
            }
        }
    }
);