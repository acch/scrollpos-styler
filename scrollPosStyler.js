/* ========================================================================
 * ScrollPos-Styler v0.7.0
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */

// JSHint directives
/* exported ScrollPosStyler */

var ScrollPosStyler = (function(document, window) {
  "use strict";

  /* ====================
   * private variables
   * ==================== */
  var scrollPosY = 0,
      busy = false,

      // toggle style / class when scrolling below this position (in px)
      scrollOffsetY = 1,

      // class used to apply scrollPosStyler to
      spsClass = "sps",

      // choose elements to apply style / class to
      elements = document.getElementsByClassName(spsClass),

      // style / class to apply to elements when above scroll position
      classAbove = "sps--abv",

      // style / class to apply to elements when below scroll position
      classBelow = "sps--blw",

      // tag to set custom scroll offset per element
      offsetTag = "data-sps-offset";

  /* ====================
   * private funcion to check scroll position
   * ==================== */
  function onScroll() {
    // ensure that events don't stack
    if (!busy) {
      // find elements to update
      var elementsToUpdate = getElementsToUpdate();

      if (elementsToUpdate.length > 0) {
        // suspend accepting scroll events
        busy = true;

        // asynchronuously update elements
        window.requestAnimationFrame(function() {
          updateElements(elementsToUpdate);
        });
      }
    }
  }

  /* ====================
   * private funcion to find elements to update
   * ==================== */
  function getElementsToUpdate() {
    // get current scroll position from window
    scrollPosY = window.pageYOffset;

    var elementsToUpdate = [];

    // iterate over elements
    // for (var elem of elements) {
    for (var i = 0; elements[i]; ++i) { // chrome workaround
      var element = elements[i];

      // get offset from element, default to global option
      var elScrollOffsetY = element.getAttribute(offsetTag) || scrollOffsetY;

      // check current state of element
      var elOnTop = element.classList.contains(classAbove);

      // if we were above, and are now below scroll position...
      if (elOnTop && scrollPosY > elScrollOffsetY) {
        // remember element
        elementsToUpdate.push({
          element: element,
          addClass: classBelow,
          removeClass: classAbove
        });

      // if we were below, and are now above scroll position...
      } else if (!elOnTop && scrollPosY <= elScrollOffsetY) {
        // remember element
        elementsToUpdate.push({
          element: element,
          addClass: classAbove,
          removeClass: classBelow
        });
      }
    }

    return elementsToUpdate;
  }

  /* ====================
   * private funcion to update elements
   * ==================== */
  function updateElements(elementsToUpdate) {
    // iterate over elements
    // for (var elem of elements) {
    for (var i = 0; elementsToUpdate[i]; ++i) { // chrome workaround
      var map = elementsToUpdate[i];

      // add style / class to element
      map.element.classList.add(map.addClass);
      map.element.classList.remove(map.removeClass);
    }

    // resume accepting scroll events
    busy = false;
  }

  /* ====================
   * public function to initially style elements based on scroll position
   *
   * Options:
   *    scrollOffsetY (number): Default scroll position in px to trigger the style. Default is 1.
   *    spsClass (String): Classname used to determine which elements to style. Default is 'sps'.
   *    classAbove (String): Classname added to the elements when the window is scrolled above the defined position. Default is 'sps--abv'.
   *    classBelow (String): Classname added to the elements when the window is scrolled below the defined position. Default is 'sps--blw'.
   *    offsetTag (String): HTML tag used on the element to specify a scrollOffsetY other than the default.
   *
   * ==================== */
  var pub = {
    init: function(options) {
      // suspend accepting scroll events
      busy = true;

      // merge options object with global options
      if (options) {
        if (options.spsClass) {
          spsClass = options.spsClass;
          elements = document.getElementsByClassName(spsClass);
        }
        scrollOffsetY = options.scrollOffsetY || scrollOffsetY;
        classAbove = options.classAbove || classAbove;
        classBelow = options.classBelow || classBelow;
        offsetTag = options.offsetTag || offsetTag;
      }

      // find elements to update
      var elementsToUpdate = getElementsToUpdate();

      if (elementsToUpdate.length > 0) {
        // asynchronuously update elements
        window.requestAnimationFrame(function() {
          updateElements(elementsToUpdate);
        });
      } else {
        // resume accepting scroll events
        busy = false;
      }
    }
  };


  /* ====================
   * main initialization
   * ==================== */
  // add initial style / class to elements when DOM is ready
  document.addEventListener("DOMContentLoaded", function() {
    // defer initialization to allow browser to restore scroll position
    window.setTimeout(pub.init, 1);
  });

  // register for window scroll events
  window.addEventListener("scroll", onScroll);

  return pub;
})(document, window);
