/**
 * fetch dependencies api.
 * @module api/fetch-dependencies
 * @see module:api/base
 */

import base from './base';

/**
 * fetch dependencies.
 * @param {object} option - option.
 * @return {promise} Promise instance.
 */
export default (option) => base.get('/dependencies', option);
