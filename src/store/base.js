/**
 * Store constructor.
 * @module store/base
 * @see module:store/dependencies
 * @see module:store/persistent
 */

import declare from 'zero-oop/declare';
import lang from 'zero-lang';

const Store = declare({
  constructor(options) {
    lang.extend(this, options);
  },

  /**
   * storage, can be an object, which used in memory, can be local-storage, etc.
   * @object
   */
  storage: {},

  /**
   * get value from storage.
   * @param {string} name, name of the key.
   * @param {any} defaultValue, default value.
   * @return {any} value.
   */
  get(name, defaultValue) {
    const value = this.storage[name];
    return lang.isUndefined(value) ? defaultValue : value;
  },

  /**
   * set value for a key in the storage.
   * @param {string} name, name of the key.
   * @param {any} value, value.
   */
  set(name, value) {
    this.storage[name] = value;
  },

  /**
   * delete value for a key in the storage.
   * @param {string} name, name of the key.
   */
  del(name) {
    delete this.storage[name];
  },

  /**
   * !!!DANGEROUS!!! clear the whole storage.
   */
  clear() {
    this.storage = {};
  },

  /**
   * get value as an integer from storage.
   * @param {string} name, name of the key.
   * @param {number} defaultValue, default value.
   * @return {number} value.
   */
  getInt(name, defaultValue) {
    const value = this.get(name);
    if (value === null) {
      return defaultValue;
    }
    return lang.toInteger(value);
  },

  /**
   * get value as true/false from storage.
   * @param {string} name, name of the key.
   * @param {boolean} defaultValue, default value.
   * @return {boolean} true or false.
   */
  getBoolean(name, defaultValue) {
    const value = this.get(name);
    if (value === null) {
      return defaultValue;
    }
    return value === 'true';
  },
});

export default Store;
