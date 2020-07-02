const { app, ipcMain } = require('electron');
const logger = require('electron-log');
const storage = require('../utils/data-store');
const {
  UPDATE_BILLING_PROFILE,
  LIST_BILLING_PROFILES,
} = require('../../src/shared/constants');

let initialized = false;
const dataDir = app.getPath('appData');
console.log({ dataDir })
// storage.init(dataDir);

ipcMain.handle(UPDATE_BILLING_PROFILE, (event, billingProfile) => {

});

ipcMain.handle(LIST_BILLING_PROFILES, async () => {
  if (!initialized) {
    await storage.init(dataDir);
    initialized = true;
  }
  try {
    const response = await storage.listBillingProfiles();
    return response;
  } catch (err) {
    logger.error(err);
    return [];
  }
});
