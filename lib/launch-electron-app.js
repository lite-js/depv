const { spawn } = require('child_process');
const which = require('which');

function resolveModule(module, resolver) {
  try {
    return (resolver || require)(module);
  } catch (_) {
    // ignore
  }
  return null;
}
const electron = process.env.ELECTRON_PATH ||
  resolveModule('electron') ||
  resolveModule('electron', which.sync);

if (!electron) {
  console.error('Can not find `electron` in the $PATH and $ELECTRON_PATH is not set.');
  console.error('Please either set $ELECTRON_PATH or `npm install electron`.');
  process.exit(1);
}

module.exports = (appPath) => {
  const args = process.argv.slice(2);
  args.unshift(appPath);

  const child = spawn(electron, args);
  child.stdout.pipe(process.stdout);
  process.stdin.pipe(child.stdin);

  child.stderr.on('data', (data) => {
    const str = data.toString('utf8');
    // it's Chromium, STFU
    if (str.match(/^\[\d+:\d+/)) {
      return;
    }
    process.stderr.write(data);
  });
  child.on('exit', (code) => {
    process.exit(code);
  });
};
