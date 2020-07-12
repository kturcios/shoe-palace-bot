const { app, ipcMain } = require('electron');
const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const logger = require('electron-log');
const { join } = require('path');
const {
  LIST_PROFILES,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} = require('../../src/shared/constants');

const storageDir = join(app.getPath('appData'), app.getName(), 'Profiles');
logger.info('storage directory: ', storageDir);

let db = null;

const init = async () => {
  db = await Storage.create({
    dir: storageDir,
  });
  await db.init();
};

ipcMain.handle(LIST_PROFILES, async () => {
  if (db === null) {
    await init();
  }
  logger.info('Attempting to list profiles...');
  const profiles = await db.values();
  logger.info('profile list: ', JSON.stringify(profiles, null, 2));
  return profiles;
});

ipcMain.handle(CREATE_PROFILE, async (event, profileDef) => {
  if (db === null) {
    await init();
  }
  const id = uuidv4();
  const newProfile = {
    id,
    ...profileDef,
  };
  logger.info('Attempting to create a new profile');
  await db.setItem(id, newProfile);
  logger.info(`New profile successfully created: ${newProfile}`);
});

ipcMain.handle(UPDATE_PROFILE, async (event, profile) => {
  if (db === null) {
    await init();
  }
  logger.info(`Attempting to update profile ${profile.id}...`);
  await db.updateItem(profile.id, profile);
  logger.info(`Profile successfully updated: ${profile.id}`);
});

ipcMain.handle(DELETE_PROFILE, async (event, id) => {
  if (db === null) {
    await init();
  }
  logger.info(`Attempting to delete profile ${id}`);
  await db.removeItem(id);
  logger.info(`Profile deleted: ${id}`);
});
