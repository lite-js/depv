/**
 * controller module.
 * @module ./visualize
 */
import template from '../template/visualize';
import json from 'zero-encoding/json';

export default function visualize(config) {
  return (req, res /* , next */) => {
    res.htmlRes(template({
      config: json.stringify(config),
    }));
  };
}
