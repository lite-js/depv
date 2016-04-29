/**
 * controller module.
 * @module ./visualize
 */
import template from '../template/visualize';

export default function visualize(config) {
  return (req, res /* , next */) => {
    res.htmlRes(template({
      config: JSON.stringify(config),
    }));
  };
}
