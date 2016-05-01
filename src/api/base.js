import qs from 'zero-encoding/querystring';
import {
  each,
  extend,
  hasSubString,
  isPlainObject,
  lc,
} from 'zero-lang';

function isSuccess(response) {
  const status = response.status;
  return (status >= 200 && status < 300) ||
    (status === 304) || (!status);
}

function wrapFetch(method, url, options = {}) {
  method = lc(method);
  const query = options.query;
  if (query && (method === 'get' || method === 'head' || method === 'delete')) {
    if (options.noCache) { // canceling cache
      query.TIMESTAMP = Date.now();
    }
    const querystr = qs.stringify(options.query) || '';
    url = url + (hasSubString(url, '?') ? '&' : '?') + querystr;
  }
  const body = options.body;
  options.headers = options.headers || {};
  if (body && (method === 'post' || method === 'put')) {
    if (!options.headers['content-Type']) {
      extend(options.headers, {
        'content-Type': 'application/x-www-form-urlencoded',
      });
    }
    if (isPlainObject(body)) {
      options.body = qs.stringify(body);
    }
  }

  options.method = method;
  options.credentials = options.credentials || 'same-origin'; // cookies are allowed

  return fetch(url, options)
    .then((response) => {
      if (isSuccess(response)) {
        try {
          return response.json();
        } catch (e) {
          return response.text();
        }
      } else {
        throw new Error(`http error: ${response.status}`);
      }
    });
}

const httpMethods = [
  'options',
  'head',
  'delete',
  'get',
  'post',
  'put',
];

const result = {};

each(httpMethods, (method) => {
  result[method] = (url, options) => wrapFetch(method, url, options);
});

export default result;
