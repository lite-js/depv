const commander = require('commander');
const { app, BrowserWindow } = require('electron');
const { resolve } = require('path');
const windowBounds = require('./lib/window-bounds')(resolve(app.getPath('userData'), './depv-config.json'));
const pkg = require('./package.json');

// opts
commander
  .version(pkg.version)
  .usage('[options] <entry file>')
  .option('-d, --debug', 'debug mode')
  .parse(process.argv);

// const entry = commander.args[0];

let win;

function createWindow() {
  win = new BrowserWindow(windowBounds.get('main'));
  win.loadURL(`file://${__dirname}/index.html`);

  if (commander.debug) win.webContents.openDevTools();

  win.on('close', () => windowBounds.set('main', win.getBounds()));
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => app.quit());
app.on('activate', () => !!win && createWindow());
