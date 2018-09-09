# ScrollPos-Styler

[![GitHub Issues](https://img.shields.io/github/issues/acch/scrollpos-styler.svg)](https://github.com/acch/scrollpos-styler/issues) [![GitHub Stars](https://img.shields.io/github/stars/acch/scrollpos-styler.svg?label=github%20%E2%98%85)](https://github.com/acch/scrollpos-styler/) [![NPM Downloads](https://img.shields.io/npm/dw/scrollpos-styler.svg?label=npm)](https://www.npmjs.com/package/scrollpos-styler) [![License](https://img.shields.io/github/license/acch/scrollpos-styler.svg)](LICENSE)

Simple JavaScript to add a custom CSS class to an HTML element depending on the window's scroll position. One CSS class is added when scrolling below a certain position, and another one is added when scrolling above that position.

## Background and Motivation

[Bootstrap](http://getbootstrap.com) v3 has a JavaScript component named Affix. [Affix](http://getbootstrap.com/javascript/#affix) can be used to modify CSS properties of an element when reaching a certain scroll position. The main use case for it is to change positioning of the element when scrolling past the element - i.e. switching from relative to fixed positioning so that the element remains visible when otherwise the user would scroll past it.

With v4 of Bootstrap, the Affix component is dropped in favor of `position:sticky` - which can be used to address the above use case. Many modern browsers have native support for it already, and [polyfills](http://html5please.com/#sticky) are available for browsers which do not natively support `position:sticky`.

However, there are other scenarios in which Affix could be used to apply custom styles / classes to elements when reaching certain scroll positions. A common example is changing the text color and background of a fixed navigation bar upon scrolling. Initially (when the page is scrolled to the very top), the navigation bar seamlessly integrates into the page - i.e. it is flat, transparent and without any shadow. When scrolling downwards, the navigation bar 'stands out' so that it seems to be hovering above the page. The background (and text) color might change, it might drop shadow, etc.

This scenario is not addressed by `position:sticky` - and this is where the small ScrollPos-Styler script comes to the rescue.

Look at the [demo](http://acch.github.io/scrollpos-styler/demo/demo.html) to get a better understanding of the effect.

## Differentiation and Limitations

This script is designed to modify attributes OTHER THAN an element's position. It doesn't work well when changing positioning of an element. Switching between `position:relative` and `position:fixed` is exactly what `position:sticky` is designed for, and this script in no viable alternative. Refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/position) for details, and use [polyfills](http://html5please.com/#sticky) for older browsers.

## Installation

Several options are available:

- Download the latest [release](https://github.com/acch/scrollpos-styler/releases/latest)
- Clone the repo: `git clone https://github.com/acch/scrollpos-styler.git`
- Install with [Bower](http://bower.io/): `bower install scrollpos-styler`
- Install with [npm](https://www.npmjs.com/): `npm install scrollpos-styler`

## Usage

Simply import the `scrollPosStyler.js` script into your HTML page at the very end of the body element. Then, add the `.sps` class to the element(s) which you want to style. Define the two CSS classes `.sps--abv` and `.sps--blw` and you're all set!

The `.sps--abv` class will be added to your element when the window is scrolled above the defined position, and `.sps--blw` will be applied when it is scrolled below that position.

The default scroll position to trigger the style is 1px, meaning that as soon as the user starts scrolling the CSS class will be toggled. This can be changed by adding the `data-sps-offset` tag in HTML and specifying an offset or by modifying the `scrollOffsetY` variable in JavaScript.

You should add the `.sps--abv` class to the element in your HTML code already, to avoid any flickering when JavaScript is initially executed.

To style elements which were created after the page was initially loaded (i.e. using JavaScript), a public initialization function is available. Simply run `ScrollPosStyler.init()` to add the appropriate class based on the current scroll position. [Demo2](http://acch.github.io/scrollpos-styler/demo/demo2.html) shows you this in action.

The following options can be used in `ScrollPosStyler.init()`:

Name | Type | Default | Description
--- | --- | --- | ---
scrollOffsetY | number | 1 | Default scroll position in px to trigger the style.
spsClass | string | 'sps' | Classname used to determine which elements to style.
classAbove | string | 'sps--abv' | Classname added to the elements when the window is scrolled above the defined position. Default is 'sps--abv'.
classBelow | string | 'sps--blw' | Classname added to the elements when the window is scrolled below the defined position. Default is 'sps--blw'.
offsetTag | string | 'data-sps-offset' | HTML tag used on the element to specify a scrollOffsetY other than the default.

### Dependencies

None. The script does not require jQuery or other JavaScript libraries. While being designed for Bootstrap, it does not require it.

### Browser support

The script uses [`Window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), as well as [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList). This means that it is supported by fairly modern browsers, only (IE 10+, Firefox 23+, Chrome 24+, Safari 6.1+). I don't plan on supporting older browsers, thus don't plan to implement any workarounds.

If you need to support older browsers then these links may provide valuable information:
- http://www.html5rocks.com/en/tutorials/speed/animations/
- http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
- https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

## Examples

The script can be used for more than just styling a static navbar. The following list provides additional usage examples for those seeking some inspiration:

-  [Demo3](http://acch.github.io/scrollpos-styler/demo/demo3.html) shows how to style relative offsets &mdash; thanks to [@mamarmite](https://github.com/mamarmite)

## Copyright and license

Copyright 2015 Achim Christ, released under the [MIT license](LICENSE).
