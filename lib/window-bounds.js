const { assign } = require('lodash');
const {
  readFileSync,
  writeFileSync,
} = require('fs');

const DEFAULT_BOUNDS = {
  width: 1200,
  height: 800,
};

function getConfig(configPath) {
  let data = {};
  try {
    data = JSON.parse(readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.error(`Invalid config path: ${configPath}`);
  }
  return data;
}

module.exports = configPath => ({
  get(name) {
    const data = getConfig(configPath);
    if (data && data[name] && data[name].bounds) {
      return data[name].bounds;
    }
    return DEFAULT_BOUNDS;
  },

  set(name, bounds = DEFAULT_BOUNDS) {
    const data = getConfig(configPath);
    data[name] = data[name] || {};
    assign(data[name], {
      bounds,
    });
    writeFileSync(configPath, JSON.stringify(data));
  },
});
