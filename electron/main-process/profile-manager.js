const { app, ipcMain } = require('electron');
const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const logger = require('electron-log');
const { join } = require('path');
const {
  LIST_PROFILES,
} = require('../../src/shared/constants');
const storageDir = join(app.getPath('appData'), 'profiles');

let storage = null;

const init = async () => {
  storage = await Storage.create({
    dir: storageDir,
  });
  await storage.init();
};

ipcMain.handle(LIST_PROFILES, async () => {
  if (storage === null) {
    await init();
  }
  logger.info('Attempting to list profiles...');
  const profiles = await storage.values();
  return profiles;
});
