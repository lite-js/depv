require('./page-loading.less');

import {
  forIn,
} from 'zero-lang/object';
import {
  each,
} from 'zero-lang/array';

const CONFIG = window.CONFIG;
const doc = window.document;
const lct = window.location;
const body = doc.body;

function unescape(s) {
  return decodeURIComponent(s.replace(/\+/g, ' '));
}

function parseQuerystring(qs) {
  const sep = '&';
  const eq = '=';
  const pieces = qs.split(sep);
  let tuple;
  let obj = {};

  each(pieces, function (elem) {
    tuple = elem.split(eq);
    if (tuple.length > 0) {
      obj[unescape(tuple.shift())] = unescape(tuple.join(eq));
    }
  });

  return obj;
}

function setElementAttrs(element, attrs) {
  forIn(attrs, function (value, key) {
    element.setAttribute(key, value);
  });
}

const query = parseQuerystring(lct.search.replace(/^\?/, '')); // query

// config locale
win.ZERO_DEFAULT_LOCALE = win.ZERO_LOCALE = win.ZERO_LOCALE || query.locale || CONFIG.zfinder.locale || 'en_US';

let overlayElement;

function loadJs(src, callback) {
  var element = doc.createElement('script');
  setElementAttrs(element, {
    type: 'text/javascript',
    async: 'true',
    src: src,
  });
  element.onload = callback;

  // IE 6 & 7
  element.onreadystatechange = function () {
    if (this.readyState == 'complete') {
      callback();
    }
  };

  body.appendChild(element);
}

function loadCss(href) {
  let link = doc.createElement('link');
  setElementAttrs(link, {
    rel: 'stylesheet',
    type: 'text/css',
    href: href,
  });
  doc.getElementsByTagName('head')[0].appendChild(link);
}

const pageLoading = win.pageLoading = {
  load() {
    // javascript
    loadJs('/src/locale/' + win.ZERO_LOCALE + '.js', function () {
      loadJs('/dist/index.js');
    });

    // css
    loadCss('/index.css');
    return pageLoading;
  },

  showOverlay() {
    if (!overlayElement) {
      overlayElement = doc.createElement('div');
      overlayElement.className = 'page-loading-overlay';
      overlayElement.innerHTML = '<div class="sk-rotating-plane"></div>';
      body.insertBefore(overlayElement, body.firstChild);
    }
    return pageLoading;
  },

  hideOverlay() {
    if (overlayElement) {
      overlayElement.parentElement.removeChild(overlayElement);
      overlayElement = null;
    }
    return pageLoading;
  },
};

pageLoading.showOverlay().load();
