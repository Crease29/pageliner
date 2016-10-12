/**
 * Shortcut for injecting a script file in the current tab
 * @param sFile
 */

chrome.extension.onMessage.addListener(
    function( request, sender, sendResponse )
    {
        if( request.sAction == 'updatePopUp' )
        {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function( aTabs ) {
                    var iTabId = aTabs[0].id;

                    if( request.oAllHelpLines )
                    {
                        var iHelpLinesCount = request.oAllHelpLines.length;

                        chrome.browserAction.setBadgeText(
                            {
                                text: iHelpLinesCount ? '' + iHelpLinesCount : '',
                                tabId: iTabId
                            }
                        );

                        chrome.browserAction.setBadgeBackgroundColor(
                            {
                                color: '#3C4E55',
                                tabId: iTabId
                            }
                        );
                    }

                    sendResponse( {} );
                }
            );
        }
    }
);