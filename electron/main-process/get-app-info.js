const { app, ipcMain } = require('electron');
const { APP_INFO } = require('../../src/shared/constants');

ipcMain.on(APP_INFO, (event) => {
  event.reply(APP_INFO, {
    name: app.name,
    version: app.getVersion(),
  });
});
