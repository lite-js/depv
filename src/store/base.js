import declare from 'zero-oop/declare';
import lang from 'zero-lang';

const Store = declare({
  constructor(options) {
    lang.extend(this, options);
  },

  storage: {},

  get(name, defaultValue) {
    const value = this.storage[name];
    return lang.isUndefined(value) ? defaultValue : value;
  },

  set(name, value) {
    this.storage[name] = value;
  },

  del(name) {
    delete this.storage[name];
  },

  clear() {
    this.storage = {};
  },

  getInt(name, defaultValue) {
    const value = this.get(name);
    if (value === null) {
      return defaultValue;
    }
    return lang.toInteger(value);
  },

  getBoolean(name, defaultValue) {
    const value = this.get(name);
    if (value === null) {
      return defaultValue;
    }
    return value === 'true';
  },
});

export default Store;
