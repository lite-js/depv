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
  const obj = {};

  each(pieces, (elem) => {
    tuple = elem.split(eq);
    if (tuple.length > 0) {
      obj[unescape(tuple.shift())] = unescape(tuple.join(eq));
    }
  });

  return obj;
}

function setElementAttrs(element, attrs) {
  forIn(attrs, (value, key) => {
    element.setAttribute(key, value);
  });
}

const query = parseQuerystring(lct.search.replace(/^\?/, '')); // query

// config locale
window.ZERO_DEFAULT_LOCALE = window.ZERO_LOCALE =
  window.ZERO_LOCALE || query.locale || CONFIG.zfinder.locale || 'en_US';

let overlayElement;

function loadJs(src, callback) {
  const element = doc.createElement('script');
  setElementAttrs(element, {
    src,
    type: 'text/javascript',
    async: 'true',
  });
  element.onload = callback;

  // IE 6 & 7
  element.onreadystatechange = () => {
    if (this.readyState === 'complete') {
      callback();
    }
  };

  body.appendChild(element);
}

function loadCss(href) {
  const link = doc.createElement('link');
  setElementAttrs(link, {
    href,
    rel: 'stylesheet',
    type: 'text/css',
  });
  doc.getElementsByTagName('head')[0].appendChild(link);
}

const pageLoading = window.pageLoading = {
  load() {
    // javascript
    loadJs(`/src/locale/${window.ZERO_LOCALE}.js`, () => {
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
