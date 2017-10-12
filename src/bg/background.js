/**
 * PageLiner
 *
 * @copyright   Kai Neuwerth 2017
 * @link        http://www.neuland-netz.de
 * @author      Kai Neuwerth
 */
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.sAction === 'updatePopUp') {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (aTabs) {
                    var iTabId = aTabs[0].id;

                    if (request.oAllHelpLines) {
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

                    sendResponse({});
                }
            );
        }
    }
);