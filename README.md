# <img src="https://github.com/Crease29/pageliner/blob/master/icons/icon_pl_48x48.png" width="24" height="24"/>&nbsp;PageLiner [![Join the chat at https://gitter.im/WebChimp-DE/pageliner](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WebChimp-DE/pageliner) ![](https://github.com/Crease29/pageliner/workflows/.github/workflows/main.yml/badge.svg)

![Chrome extension version](https://badgen.net/chrome-web-store/v/nepakmljodobhlbbkpobblnifmhclemh) ![Chrome extension user count](https://badgen.net/chrome-web-store/users/nepakmljodobhlbbkpobblnifmhclemh)  ![Chrome extension price](https://badgen.net/chrome-web-store/price/nepakmljodobhlbbkpobblnifmhclemh) ![Chrome extension rating count](https://badgen.net/chrome-web-store/rating-count/nepakmljodobhlbbkpobblnifmhclemh)

If you like this extension, I would be glad if you buy me a beer :beer: :grin:
[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=Crease29&url=https%3A%2F%2Fgithub.com%2FCrease29%2Fpageliner%2F&title=PageLiner&language=en_GB&tags=github&category=software) [![Donate via PayPal](https://github.com/Crease29/pageliner/blob/master/images/donate_paypal.png)](https://www.paypal.me/koi)

Google Chrome extension to create guide lines on a website.

[View in Chrome Web Store](https://chrome.google.com/webstore/detail/pageliner/nepakmljodobhlbbkpobblnifmhclemh)

If you have any suggestions or bugs, please create an issue or use the support form in Chrome Web Store. Thank you!

## Features

### Add guide lines from the rulers

Hover over one of the rulers and start dragging a new guide line from there, like you know it from Photoshop.

### Add guide lines with shortcuts

- <kbd>Alt</kbd>+<kbd>H</kbd> adds a *horizontal* guide line at your cursor position and selects it for keyboard movement.
- <kbd>Alt</kbd>+<kbd>V</kbd> adds a *vertical* guide line at your cursor position and selects it for keyboard movement.
- <kbd>Alt</kbd>+<kbd>A</kbd> adds a *horizontal* and a *vertical* guide line at your cursor position.

### Move guide lines with keyboard

1. Add a guide line.
2. Click on it (the guide line will slightly blur then).
3. Use your arrow keys to move the guide line.

:fire: **PRO TIP**: Hold down <kbd>Shift</kbd> while using the arrow keys to move the guide line faster. :wink:

### Remove guide lines with keyboard

1. Select a guide line.
2. Press <kbd>Del</kbd>.

### Discard active guide line selection

1. Select a guide line.
2. Press <kbd>Esc</kbd>.

### Measure the distance between guide lines / window border

1. Hover over a guide line.
2. Hold down <kbd>Ctrl</kbd>.

## Changelog
- **v1.5.4 (2019-10-10)**
    - Add horizontal and vertical guidelines with <kbd>Alt</kbd>+<kbd>A</kbd>
- **v1.5.3 (2019-10-08)**
    - Toggle guides individually from menu
- **v1.5.2 (2018-06-08)**
    - Prevented adding new guide lines with shortcuts while pressing <kbd>Ctrl</kbd> or <kbd>Shift</kbd>
- **v1.5.1 (2018-04-27)**
    - Add functionality to delete selected guide line by pressing <kbd>Esc</kbd>.
    - Add functionality to discard selected guide line by pressing <kbd>Del</kbd>.
    - Add functionality to delete guide line when moving it to the left/top window border. Thanks to [@wolv-dev](https://github.com/wolv-dev) for your suggestion!
    - Guide lines that are added via keyboard shortcuts are now positioned at the mouse cursor position. Thanks to [@YannikSc](https://github.com/YannikSc) for your suggestion!
- **v1.5.0 (2018-04-22)**
    - Cleaned up code
    - Guide lines that are added with shortcut are now directly selected for keyboard movement
    - Fixed vertical movement with the keyboard which cause viewport scrolling
    - Add faster movement with keyboard when pressing <kbd>Shift</kbd> + arrow keys
    - Add install page after extension update
- **v1.4.0 (2018-04-21)**
    - Added function to move a guide line with the arrow keys after clicking it. Thanks to [@Tainan404](https://github.com/Tainan404) for your suggestion!
    - Added shortcuts Alt+H and Alt+V to add guide lines. Have a look at the features on this page. Thanks to [@Tainan404](https://github.com/Tainan404) for your suggestion!
- **v1.3.4 (2017-12-18)**
    - Added touch support with "[jQuery UI Touch Punch](https://github.com/furf/jquery-ui-touch-punch)" by [@furf](https://github.com/furf) 
    - Added Portuguese translations. Thanks to [@Tainan404](https://github.com/Tainan404)
- **v1.3.3 (2017-10-12)**
    - Fixed bug that caused guide lines to jump when the user isn't at the top of the page. Thanks to [@boxmein](https://github.com/boxmein) for reporting this issue.
    - Updated jQuery and jQuery UI
    - Cleaned up repository
    - Reformatted code
- **v1.3.2 (2017-05-09)**
    - Added Spanish translations.
    - Added French translations.
    - Removed unused jQuery click event from page action
- **v1.3.1 (2017-05-02)**
    - Added Russian translations. Thanks to [@vanilla-thunder](https://github.com/vanilla-thunder)
    - Added Dutch translations. Thanks to [@hoekiesda](https://github.com/hoekiesda)
    - Adjusted color of distance lines
- **v1.3.0 (2017-04-27)**
    - Added functionality to see distances between guide lines (Hover over guide line and press the <kbd>Ctrl</kbd> key). Have a look at the features on this page.
- **v1.2.3 (2016-11-07)**
    - Added a small donate button for people that would like to support this awesome extension.
- **v1.2.2 (2016-10-13)**
    - Fixed bug with double rendered guide lines
- **v1.2.1 (2016-10-13)**
    - Fixed encoding error.
- **v1.2.0 (2016-10-13)**
    - Removed Ad-Link
    - Added possibility to create new guide lines by dragging from the rulers. Have a look at the features on this page.
    - Added indicator whether guide lines are shown
- **v1.1.2 (2014-08-30)**
    - Horizontal guide lines are now placed in viewport when you have scrolled down.
    - The ID of every guide line is now shown in it's tooltip which is referenced to the ID in the extension popup.
    - Changed default locale to "en"
- **v1.1.1 (2014-07-14)**
    - Implemented jQuery Color Picker because the behaviour of HTML 5 color-input isn't that reliable on all operating systems.
- **v1.1.0 (2014-07-13)**
    - When zooming in a document the positions in tooltips are float numbers.
    - The number of guide lines is now shown in the plugin icon.
    - UI optimization
    - The color of guide lines can now be changed.
    - Every single guide line can be removed manually.
- **v1.0.3 (2014-07-10)**
    - Updated translations (en)
    - Cleanup
- **v1.0.2 (2014-07-01)**
    - Rulers are now instantly hidden when deleting all guide lines.
- **v1.0.1 (2014-06-30)**
    - Description added
- **v1.0.0 (2014-06-26)**
    - Rulers are now hidden when deleting all guide lines.
    - Code-Cleanup
