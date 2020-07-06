const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const { BILLING_PROFILES_DB } = require('../../src/shared/constants');

let storage = null;

const listBillingProfiles = async () => await storage.getItem(BILLING_PROFILES_DB) || [];

const deleteBillingProfileByIndex = async (index) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES_DB) || [];
  const updatedList = bProfilesList.filter((bProfile, i) => i !== index);
  await storage.setItem(BILLING_PROFILES_DB, updatedList);
};

const createBillingProfile = async (billingProfile) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES_DB) || [];
  bProfilesList.push({
    id: uuidv4(),
    ...billingProfile,
  });
  await storage.setItem(BILLING_PROFILES_DB, bProfilesList);
};

const updateBillingProfileByIndex = async (updatedBillingProfile, index) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES_DB) || [];
  bProfilesList[index] = updatedBillingProfile;
  await storage.setItem(BILLING_PROFILES_DB, bProfilesList);
};

const init = async (storageDir) => {
  storage = await Storage.create({
    dir: storageDir,
  });
  await storage.init();
};

module.exports = {
  init,
  listBillingProfiles,
  createBillingProfile,
  deleteBillingProfileByIndex,
  updateBillingProfileByIndex,
};
