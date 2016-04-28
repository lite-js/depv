/**
 * controller module.
 * @module ./dependenciesSVG
 * @see module:../model/dependencies
 */
import template from '../template/visualize';
import json from 'zero-encoding/json';

export default function constroller(config) {
  return (req, res /* , next */) => {
    res.htmlRes(template({
      config: json.stringify(config),
    }));
  };
}
