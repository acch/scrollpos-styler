/* ========================================================================
 * ScrollPos-Styler v0.6.2
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
      // get current scroll position from window
    //   scrollPosY = window.pageYOffset;

      var elementsToUpdate = getElementsToUpdate();

      if (elementsToUpdate.length > 0) {
          busy = true;
          window.requestAnimationFrame(function() {
              updateElements(elementsToUpdate);
          });
      }
    }
  }

  function getElementsToUpdate() {
      // get current scroll position from window
      scrollPosY = window.pageYOffset;

      var elementsToUpdate = [];

      for (var i = 0; elements[i]; ++i) { // chrome workaround
          var element = elements[i];

          var elScrollOffsetY = element.getAttribute(offsetTag) || scrollOffsetY;
          var elOnTop = element.classList.contains(classAbove);

          if (elOnTop && scrollPosY > elScrollOffsetY) {
              elementsToUpdate.push({
                 element: element,
                 addClass: classBelow,
                 removeClass: classAbove
              });
          } else if (!elOnTop && scrollPosY <= elScrollOffsetY) {
              elementsToUpdate.push({
                 element: element,
                 addClass: classAbove,
                 removeClass: classBelow
              });
          }
      }

      return elementsToUpdate;
  }

  function updateElements(elementsToUpdate) {
      for (var i = 0; elementsToUpdate[i]; ++i) { // chrome workaround
          var map = elementsToUpdate[i];
          map.element.classList.add(map.addClass);
          map.element.classList.remove(map.removeClass);
      }
      busy = false;
  }

  /* ====================
   * public function to initially style elements based on scroll position
   *
   * Options:
   *    scrollOffsetY (number): Default scroll position to trigger the style. Default is 1.
   *    spsClass (String): Classname used to determine which elements to style. Default is 'sps'.
   *    classAbove (String): Classname added to the elements when the window is scrolled above the defined position. Default is 'sps--abv'.
   *    classBelow (String): Classname added to the elements when the window is scrolled below the defined position. Default is 'sps--blw'.
   *    offsetTag (String): HTML tag used on the element to speciify a scrollOffsetY other than the default.
   *
   * ==================== */
  var pub = {
    init: function(options) {
      // suspend accepting scroll events
      busy = true;

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

      var elementsToUpdate = getElementsToUpdate();

      if (elementsToUpdate.length > 0) {
          window.requestAnimationFrame(function() {
              updateElements(elementsToUpdate);
          });
      } else {
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
