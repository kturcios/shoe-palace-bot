/* eslint-disable no-use-before-define */
const {
  app,
  Menu,
  MenuItem,
  dialog,
  BrowserWindow,
  ipcMain,
} = require('electron');
const { autoUpdater } = require('electron-updater');
const { join } = require('path');
const logger = require('electron-log');
const isDev = require('electron-is-dev');

logger.transports.file.level = 'info';

// Disable automatic downloads for manual update workflow
autoUpdater.autoDownload = false;

// Configure logger for autoUpdater
autoUpdater.logger = logger;

// Window to show the download progress
let downloadWindow = null;

// Required file for testing auto udpates in dev mode
if (isDev) {
  autoUpdater.updateConfigPath = join(__dirname, 'dev-update.yaml');
}

// Check if the latest available version is greater than the currently
// installed version.
const isUpdateAvailable = (updateInfo) => {
  const latestUpdateVersion = updateInfo.version;
  const currentVersion = app.getVersion();
  return latestUpdateVersion > currentVersion;
};

// Setup download window
const createDownloadWindow = () => {
  downloadWindow = new BrowserWindow({
    width: 400,
    height: 150,
    resizable: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
    },
  });
  downloadWindow.loadURL(`file://${join(__dirname, './download.html')}`);
};

// Wraps the events emitted to and from the download window into a promise.
// Returns a fulfilled promise if:
//  - user cancels download
//  - user clicks install and relaunch
// Returns a rejected promise if an error occurs during the download process
const handleDownloadProcess = () => new Promise((resolve, reject) => {
  autoUpdater.on('download-progress', (progressObj) => {
    downloadWindow.webContents.send('download-progress', progressObj);
  });
  autoUpdater.on('update-downloaded', () => {
    downloadWindow.webContents.send('update-downloaded');
  });
  autoUpdater.on('error', (err) => {
    reject(err);
  });
  ipcMain.on('cancel-download', () => {
    logger.info('Download cancelled by user.');
    resolve();
  });
  ipcMain.on('install-and-relaunch', () => {
    logger.info('Install and relaunch clicked by user');
    autoUpdater.quitAndInstall();
    resolve();
  });
});

// Displays "Downloading..." window with a progress bar
const handleDownloadUpdate = async () => {
  logger.info('Starting download...');
  try {
    createDownloadWindow();
    // Start downloading update once download window is ready
    downloadWindow.webContents.on('dom-ready', () => {
      autoUpdater.downloadUpdate();
    });
    await handleDownloadProcess();
  } catch (err) {
    handleUpdateError(err);
  } finally {
    // Remove download listeners
    autoUpdater.removeAllListeners([
      'download-progress',
      'update-downloaded',
      'error',
      'cancel-download',
      'install-and-relaunch',
    ]);
    downloadWindow.close();
    downloadWindow = null;
  }
};

// Display "New Version" window with option to download the update
const handleUpdateAvailable = async (updateInfo) => {
  logger.info(`Update available: ${JSON.stringify(updateInfo)}`);
  const { releaseNotes } = updateInfo;
  try {
    const { response } = await dialog.showMessageBox({
      type: 'info',
      title: 'Update available',
      message: `A new version of ${app.name} is available!`,
      detail: `Release notes:\n\n${releaseNotes}\n\n`,
      buttons: ['Cancel', 'Install Update'],
      cancelId: 0,
      defaultId: 1,
    });
    if (response === 1) {
      // Delay download for 1 second to enhance UX
      setTimeout(() => handleDownloadUpdate(), 1000);
    }
  } catch (err) {
    handleUpdateError(err);
  }
};

// Display "You're on the latest version" window
const handleUpdateNotAvailable = () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'You\'re up-to-date!',
    detail: `Current version: ${app.getVersion()}`,
  });
};

// Display error message window
const handleUpdateError = (err) => {
  dialog.showErrorBox('Failed to fetch updates', `Reason:\n${err.message}`);
};

// Used to control the 'Check for updates...' button on the application menu
const changeUpdaterMenu = ({ label, enabled }) => {
  const { items } = Menu.getApplicationMenu();
  items[0] = new MenuItem({
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      {
        label,
        enabled,
        click: () => checkForUpdates(),
      },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });
  const template = Menu.buildFromTemplate(items);
  Menu.setApplicationMenu(template);
};

// Handler for checking updates.
// 1. If update is available -> display "New Version" window
// 2. If update is NOT available -> display "You're on the latest version" window
// 3. If fail to fetch update -> display error message window
const checkForUpdates = async () => {
  changeUpdaterMenu({ label: 'Checking for updates...', enabled: false });
  try {
    const { updateInfo } = await autoUpdater.checkForUpdates();
    const updateAvailable = isUpdateAvailable(updateInfo);
    if (updateAvailable) {
      handleUpdateAvailable(updateInfo);
      return;
    }
    handleUpdateNotAvailable();
  } catch (err) {
    handleUpdateError(err);
  } finally {
    changeUpdaterMenu({ label: 'Check for updates...', enabled: true });
  }
};

// Similar to the regular check for updates but only opens a window if there is a new version
// available. Primarily used to check for new updates on app start.
const silentCheckForUpdates = async () => {
  changeUpdaterMenu({ label: 'Checking for updates...', enabled: false });
  try {
    const { updateInfo } = await autoUpdater.checkForUpdates();
    const updateAvailable = isUpdateAvailable(updateInfo);
    if (updateAvailable) {
      handleUpdateAvailable(updateInfo);
      return;
    }
  } catch (err) {
    logger.error(`Failed to fetch silent updates. ${err}`);
  } finally {
    changeUpdaterMenu({ label: 'Check for updates...', enabled: true });
  }
};

module.exports = {
  checkForUpdates,
  silentCheckForUpdates,
};
