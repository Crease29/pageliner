/**
 * PageLiner
 *
 * @copyright   2018 Kai Neuwerth
 * @author      Kai Neuwerth
 * @link        https://kai.neuwerth.me
 */

chrome.browserAction.setBadgeText({text: ''});

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

chrome.runtime.onInstalled.addListener(function (details) {
    var resetPopUp = function () {
            chrome.browserAction.setPopup({'popup': 'src/page_action/page_action.html'});
            chrome.browserAction.setBadgeText({text: ''});
        },
        openChangeLogTab = function () {
            chrome.tabs.create({'url': 'https://github.com/Crease29/pageliner#changelog'});
            resetPopUp();
        },
        openFeaturesTab = function () {
            chrome.tabs.create({'url': 'https://github.com/Crease29/pageliner#features'});
            resetPopUp();
        };

    // only on first run
    if (typeof details.previousVersion === 'undefined') {
        setTimeout(function () {
            chrome.tabs.create({url: chrome.extension.getURL('src/pages/ChromeFirstRun.html')});
        }, 200);
        chrome.browserAction.onClicked.addListener(openFeaturesTab);
    } else {
        chrome.browserAction.onClicked.addListener(openChangeLogTab);
    }

    chrome.browserAction.setBadgeText({text: 'NEW'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#e20700'});
    chrome.browserAction.setPopup({'popup': ''});
});