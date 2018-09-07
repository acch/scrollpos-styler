/**
 * @license
 * ========================================================================
 * ScrollPos-Styler v0.7.1
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */
var ScrollPosStyler=function(t,r){"use strict";var o=0,a=!1,i=1,n="sps",c=t.getElementsByClassName(n),f="sps--abv",m="sps--blw",u="data-sps-offset";function l(s){var e=[];o=r.pageYOffset;for(var t=0;c[t];++t){var a=c[t],n=a.getAttribute(u)||i,l=a.classList.contains(f);(s||l)&&n<o?e.push({element:a,addClass:m,removeClass:f}):(s||!l)&&o<=n&&e.push({element:a,addClass:f,removeClass:m})}return e}function v(s){for(var e=0;s[e];++e){var t=s[e];t.element.classList.add(t.addClass),t.element.classList.remove(t.removeClass)}a=!1}var s={init:function(s){a=!0,s&&(s.spsClass&&(n=s.spsClass,c=t.getElementsByClassName(n)),i=s.scrollOffsetY||i,f=s.classAbove||f,m=s.classBelow||m,u=s.offsetTag||u);var e=l(!0);0<e.length?r.requestAnimationFrame(function(){v(e)}):a=!1}};return t.addEventListener("DOMContentLoaded",function(){r.setTimeout(s.init,1)}),r.addEventListener("scroll",function(){if(!a){var s=l(!1);0<s.length&&(a=!0,r.requestAnimationFrame(function(){v(s)}))}}),s}(document,window);