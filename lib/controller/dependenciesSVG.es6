import template from '../template/visualize';
import json from 'zero-encoding/json';

export default (config) => {
    return (req, res, next) => {
        res._HTMLRes(template({
            config: json.stringify(config)
        }));
    };
};
