import 'evil-icons/assets/evil-icons.css';
import './page-loading.less';

import {
  each,
  forIn,
} from 'zero-lang';

const CONFIG = window.CONFIG;
const lct = window.location;
const doc = window.document;
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
window.ZERO_DEFAULT_LOCALE = window.ZERO_LOCALE = window.ZERO_LOCALE || query.locale || CONFIG.locale || 'en_US';

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

let overlayElement;
function ensureLoadingElement(callback) {
  if (!overlayElement) {
    overlayElement = doc.getElementById('loading-mask');
  }
  callback();
}

const pageLoading = window.pageLoading = {
  load() {
    // javascript
    loadJs(`src/locale/${window.ZERO_LOCALE}.js`, () => {
      loadJs('dist/index.js');
    });
    // css
    loadCss('dist/index.css');
    return pageLoading;
  },

  showLoading() {
    ensureLoadingElement(() => {
      overlayElement.style.display = '';
    });
    return pageLoading;
  },

  hideLoading() {
    ensureLoadingElement(() => {
      overlayElement.style.display = 'none';
    });
    return pageLoading;
  },
};

pageLoading.showLoading().load();
