/**
 * controller module.
 * @module ./dependencies
 * @see module:../model/dependencies
 */
import analyserMap from '../analyser';

export default () => (req, res /* , next */) => {
  const query = req.query;
  try {
    analyserMap[query.analyser](query, (data) => {
      res.jsonRes(data);
    });
  } catch (e) {
    res.jsonRes({});
  }
};
