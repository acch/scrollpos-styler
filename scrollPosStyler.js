"use strict";

var scrollPosY = 0,
    busy = false,
    onTop = true,

    // toggle style / class when scrolling below this position (in px)
    scrollOffsetY = 1,

    // choose element to apply style / class to
    myElement = document.getElementById("sps");

function onScroll() {
  // ensure that events don't stack
  if (!busy) {
    // get current scroll position from window
    scrollPosY = window.scrollY;

    // if we were above, and are now below scroll position...
    if (onTop && scrollPosY > scrollOffsetY) {
      // suspend accepting scroll events
      busy = true;

      // remember that we are below scroll position
      onTop = false;

      // asynchronuously add style / class to element
      requestAnimationFrame(belowScrollPos);

    // if we were below, and are now above scroll position...
    } else if (!onTop && scrollPosY <= scrollOffsetY) {
      // suspend accepting scroll events
      busy = true;

      // remember that we are above scroll position
      onTop = true;

      // asynchronuously add style / class to element
      requestAnimationFrame(aboveScrollPos);
    }
  }
};

function aboveScrollPos() {
  // add style / class to element
  myElement.classList.add("sps--abv");
  myElement.classList.remove("sps--blw");

  // resume accepting scroll events
  busy = false;
};

function belowScrollPos() {
  // add style / class to element
  myElement.classList.add("sps--blw");
  myElement.classList.remove("sps--abv");

  // resume accepting scroll events
  busy = false;
};

// register for window scroll events
window.addEventListener('scroll', onScroll, false);
