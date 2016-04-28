import lang from 'zero-lang';

import Store from './base';

let webStorage;
try {
  webStorage = window.localStorage;
} catch (e) {
  try {
    webStorage = window.sessionStorage;
  } catch (err) {
    webStorage = {};
  }
}

export default new Store({
  storage: webStorage,
  get(name, defaultValue) {
    const value = this.storage[name];
    if (lang.isString(value)) {
      return JSON.parse(value);
    }

    return defaultValue;
  },

  set(name, value) {
    this.storage[name] = JSON.stringify(value);
  },

  del(name) {
    delete this.storage.removeItem(name);
  },
});
