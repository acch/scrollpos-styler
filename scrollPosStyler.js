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

      // choose elements to apply style / class to
      elements = document.getElementsByClassName("sps"),

      // style / class to apply to elements when above scroll position
      classAbove = "sps--abv",

      // style / class to apply to elements when below scroll position
      classBelow = "sps--blw";

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
   * ==================== */
  var pub = {
    init: function() {
      // suspend accepting scroll events
      busy = true;

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
