/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
} = require('electron');
const { join } = require('path');
const { sync } = require('glob');
const isDev = require('electron-is-dev');
// const { checkForUpdates, silentCheckForUpdates } = require('./utils/auto-update');

let mainWindow;

// const configureMenu = () => {
//   const { items } = Menu.getApplicationMenu();
//   items[0] = new MenuItem({
//     label: app.name,
//     submenu: [
//       { role: 'about' },
//       { type: 'separator' },
//       { label: 'Checking for updates...', enabled: false, click: () => checkForUpdates() },
//       { type: 'separator' },
//       { role: 'quit' },
//     ],
//   });
//   const template = Menu.buildFromTemplate(items);
//   Menu.setApplicationMenu(template);
// };

const loadMainProcesses = () => {
  const files = sync(join(__dirname, 'main-process/**/*.js'));
  files.forEach((file) => require(file));
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1060,
    height: 850,
    minHeight: 850,
    minWidth: 1060,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${join(__dirname, '../index.html')}`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  loadMainProcesses();
  // configureMenu();
  createWindow();
  // Check for updates on start after 5 seconds
  // setTimeout(() => silentCheckForUpdates(), 5000);
});

app.on('window-all-closed', () => {
  app.quit();
});
