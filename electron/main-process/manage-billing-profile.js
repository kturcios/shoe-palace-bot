const { app, ipcMain } = require('electron');
const logger = require('electron-log');
const storage = require('../utils/data-store');
const {
  UPDATE_BILLING_PROFILE,
  LIST_BILLING_PROFILES,
  DELETE_BILLING_PROFILE,
} = require('../../src/shared/constants');

let initialized = false;
// const dataDir = app.getPath('appData');
const dataDir = '/Users/kturcios/GitHub/shoe-palace-bot/storage/billing-profiles';

ipcMain.handle(UPDATE_BILLING_PROFILE, async (event, isNew, billingProfile) => {
  if (!initialized) {
    await storage.init(dataDir);
    initialized = true;
  }
  if (isNew) {
    await storage.createBillingProfile(billingProfile);
    return;
  }
  const bProfilesList = await storage.listBillingProfiles();
  let updateIndex = -1;
  for (let i = 0; i < bProfilesList.length; i += 1) {
    if (bProfilesList[i].id === billingProfile.id) {
      updateIndex = i;
      break;
    }
  }
  if (updateIndex !== -1) {
    await storage.updateBillingProfileByIndex(billingProfile, updateIndex);
  }
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

ipcMain.handle(DELETE_BILLING_PROFILE, async (event, deleteIndex) => {
  if (!initialized) {
    await storage.init(dataDir);
    initialized = true;
  }

  if (deleteIndex !== -1) {
    try {
      await storage.deleteBillingProfileByIndex(deleteIndex);
      logger.info('Billing profile deleted');
    } catch (err) {
      logger.error(`Failed to delete profile: ${err}`);
    }
  }
});
