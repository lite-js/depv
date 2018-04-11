const commander = require('commander');
const madge = require('madge');
const {
  app,
  BrowserWindow,
  ipcMain,
} = require('electron');
const { resolve } = require('path');
const windowBounds = require('./lib/window-bounds')(resolve(app.getPath('userData'), './depv-config.json'));
const pkg = require('./package.json');

// opts
commander
  .version(pkg.version)
  .usage('[options] <entry>')
  .option('-d, --debug', 'debug mode')
  .parse(process.argv);

const entry = commander.args[0];

if (!entry) {
  console.error('entry is not defined!');
  process.exit();
}

let dependencies = null;
let win;

madge(entry, {
  includeNpm: true,
}).then((res) => {
  dependencies = res.obj();
  console.log(dependencies);
});

ipcMain.on('get-dependencies', (evt) => {
  evt.sender.send('dependencies', dependencies);
});

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
