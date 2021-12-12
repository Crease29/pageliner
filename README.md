# <img src="https://github.com/Crease29/pageliner/blob/master/icons/icon_pl_48x48.png" width="24" height="24"/>&nbsp;PageLiner [![Join the chat at https://gitter.im/WebChimp-DE/pageliner](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/WebChimp-DE/pageliner) ![](https://github.com/Crease29/pageliner/workflows/.github/workflows/main.yml/badge.svg)

![Chrome extension version](https://badgen.net/chrome-web-store/v/nepakmljodobhlbbkpobblnifmhclemh) ![Chrome extension user count](https://badgen.net/chrome-web-store/users/nepakmljodobhlbbkpobblnifmhclemh)  ![Chrome extension price](https://badgen.net/chrome-web-store/price/nepakmljodobhlbbkpobblnifmhclemh) ![Chrome extension rating count](https://badgen.net/chrome-web-store/rating-count/nepakmljodobhlbbkpobblnifmhclemh)

If you like this extension, I'd be really happy to receive an honest review and/or a tiny donation 🤗🥰 That means a lot to me!

- [PayPal](https://www.paypal.me/koi)
- Bitcoin (BTC): `1PD2v5chdNR67kjpWAyKYZ5U6oSFqpRiVs`
- Dogecoin (DOGE): `D5oEU9VbQ8jY8BGcrVoMLUxXzD26VMJzqM`
- Ethereum (ETH): `0xEE3057Cc44F93DC20423a682AFB35e93C4A134fd`
- Litecoin (LTC): `LXbNG6VdCyqWmgvKZxyr4QinfiFiq8ebyb`
- Ripple (XRP): `rnVEhBpThdY9Vs8sYJdoXxH9oFRC84LDyw`
- Stellar Lumen (XLM): `GCLNBSZWFQZLALMMNKTCUMXHI5QMEGN5XE2SH6HG63HKXTGUINFYI7OI`

Google Chrome and Edge extension to create guidelines on a website.

▶ [View in Chrome Web Store](https://chrome.google.com/webstore/detail/pageliner/nepakmljodobhlbbkpobblnifmhclemh)

▶ [View in Mozilla 🦊 Firefox Add-Ons Store](https://addons.mozilla.org/de/firefox/addon/pageliner/)

▶ [View in Microsoft Edge-Add-Ons Store](https://microsoftedge.microsoft.com/addons/detail/pageliner/kcombcinjokdchiiakigflgcangmfafp)

If you have any suggestions or bugs, please create an issue or use the support form in Chrome Web Store. Thank you!

## Features

### Add guidelines from the rulers

Hover over one of the rulers and start dragging a new guideline from there, like you know it from Photoshop.

### Add guidelines with shortcuts

- <kbd>Alt</kbd>+<kbd>H</kbd> adds a *horizontal* guideline at your cursor position and selects it for keyboard movement.
- <kbd>Alt</kbd>+<kbd>V</kbd> adds a *vertical* guideline at your cursor position and selects it for keyboard movement.
- <kbd>Alt</kbd>+<kbd>A</kbd> adds a *horizontal* and a *vertical* guideline at your cursor position.

### Move guidelines with keyboard

1. Add a guideline.
2. Click on it (the guideline will slightly blur then).
3. Use your arrow keys to move the guideline.

:fire: **PRO TIP**: Hold down <kbd>Shift</kbd> while using the arrow keys to move the guideline faster. :wink:

### Remove guidelines with keyboard

1. Select a guideline.
2. Press <kbd>Del</kbd>.

### Discard active guideline selection

1. Select a guideline.
2. Press <kbd>Esc</kbd>.

### Measure the distance between guidelines / window border

1. Hover over a guideline.
2. Hold down <kbd>Ctrl</kbd>.

### Show and hide guidelines and rulers with shortcuts
- <kbd>Alt</kbd>+<kbd>G</kbd> toggles the visibility of the guidelines.
- <kbd>Alt</kbd>+<kbd>R</kbd> toggles the visibility of the rulers.

## Contributing

If you'd like to contribute to this repository, here is a guide on [how to set up an unpacked extension in Google Chrome](https://developer.chrome.com/extensions/getstarted#manifest).
Please make sure to include your changes in the Changelog below and consider changing the version in the [manifest.json](manifest.json).

## Changelog
- **UPCOMING**
    - Added Slovak translations. Thanks to [@github4maninder](https://github.com/github4maninder)
    - Added Thai translations. Thanks to [@DerekJxy](https://github.com/DerekJxy)
    - Fixed donation link
    - Removed `js/bootstrap.min.js`, because it's not needed anymore
- **v1.6.4 (2020-12-07)**
    - Nothing changed to v1.6.3 (see below), I just had to create a new version number, due to conflicts with submissions in the new stores.
- **v1.6.3 (2020-12-07)**
    - Added PageLiner to the [Microsoft Edge-Add-Ons Store](https://microsoftedge.microsoft.com/addons/detail/pageliner/kcombcinjokdchiiakigflgcangmfafp)
    - Added PageLiner to the [Mozilla 🦊 Firefox Add-Ons Store](https://addons.mozilla.org/de/firefox/addon/pageliner/)
    - Added Vietnamese translations
    - Updated external links to [pageliner.com](https://pageliner.com)
    - Updated some text snippets
    - Fix null-pointer exception in `page_action.js`
- **v1.6.2 (2020-05-25)**
    - Removed unnecessary rights from manifest.json
- **v1.6.1 (2019-10-10)**
    - Hidden rulers/guides now stay hidden after reload
- **v1.6.0 (2019-10-10)**
    - Add horizontal and vertical guidelines with <kbd>Alt</kbd>+<kbd>A</kbd>
    - Toggle visibility of guidelines with <kbd>Alt</kbd>+<kbd>G</kbd>
    - Toggle visibility of rulers with <kbd>Alt</kbd>+<kbd>R</kbd>
- **v1.5.3 (2019-10-08)**
    - Toggle guides individually from menu
- **v1.5.2 (2018-06-08)**
    - Prevented adding new guidelines with shortcuts while pressing <kbd>Ctrl</kbd> or <kbd>Shift</kbd>
- **v1.5.1 (2018-04-27)**
    - Add functionality to delete selected guideline by pressing <kbd>Esc</kbd>.
    - Add functionality to discard selected guideline by pressing <kbd>Del</kbd>.
    - Add functionality to delete guideline when moving it to the left/top window border. Thanks to [@wolv-dev](https://github.com/wolv-dev) for your suggestion!
    - guidelines that are added via keyboard shortcuts are now positioned at the mouse cursor position. Thanks to [@YannikSc](https://github.com/YannikSc) for your suggestion!
- **v1.5.0 (2018-04-22)**
    - Cleaned up code
    - guidelines that are added with shortcut are now directly selected for keyboard movement
    - Fixed vertical movement with the keyboard which cause viewport scrolling
    - Add faster movement with keyboard when pressing <kbd>Shift</kbd> + arrow keys
    - Add install page after extension update
- **v1.4.0 (2018-04-21)**
    - Added function to move a guideline with the arrow keys after clicking it. Thanks to [@Tainan404](https://github.com/Tainan404) for your suggestion!
    - Added shortcuts Alt+H and Alt+V to add guidelines. Have a look at the features on this page. Thanks to [@Tainan404](https://github.com/Tainan404) for your suggestion!
- **v1.3.4 (2017-12-18)**
    - Added touch support with "[jQuery UI Touch Punch](https://github.com/furf/jquery-ui-touch-punch)" by [@furf](https://github.com/furf) 
    - Added Portuguese translations. Thanks to [@Tainan404](https://github.com/Tainan404)
- **v1.3.3 (2017-10-12)**
    - Fixed bug that caused guidelines to jump when the user isn't at the top of the page. Thanks to [@boxmein](https://github.com/boxmein) for reporting this issue.
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
    - Added functionality to see distances between guidelines (Hover over guideline and press the <kbd>Ctrl</kbd> key). Have a look at the features on this page.
- **v1.2.3 (2016-11-07)**
    - Added a small donate button for people that would like to support this awesome extension.
- **v1.2.2 (2016-10-13)**
    - Fixed bug with double rendered guidelines
- **v1.2.1 (2016-10-13)**
    - Fixed encoding error.
- **v1.2.0 (2016-10-13)**
    - Removed Ad-Link
    - Added possibility to create new guidelines by dragging from the rulers. Have a look at the features on this page.
    - Added indicator whether guidelines are shown
- **v1.1.2 (2014-08-30)**
    - Horizontal guidelines are now placed in viewport when you have scrolled down.
    - The ID of every guideline is now shown in it's tooltip which is referenced to the ID in the extension popup.
    - Changed default locale to "en"
- **v1.1.1 (2014-07-14)**
    - Implemented jQuery Color Picker because the behaviour of HTML 5 color-input isn't that reliable on all operating systems.
- **v1.1.0 (2014-07-13)**
    - When zooming in a document the positions in tooltips are float numbers.
    - The number of guidelines is now shown in the plugin icon.
    - UI optimization
    - The color of guidelines can now be changed.
    - Every single guideline can be removed manually.
- **v1.0.3 (2014-07-10)**
    - Updated translations (en)
    - Cleanup
- **v1.0.2 (2014-07-01)**
    - Rulers are now instantly hidden when deleting all guidelines.
- **v1.0.1 (2014-06-30)**
    - Description added
- **v1.0.0 (2014-06-26)**
    - Rulers are now hidden when deleting all guidelines.
    - Code-Cleanup
