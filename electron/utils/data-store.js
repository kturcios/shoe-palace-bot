const storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const { BILLING_PROFILES } = require('../../src/shared/constants');

const listBillingProfiles = async () => await storage.getItem(BILLING_PROFILES) || [];

const deleteBillingProfileByIndex = async (index) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES) || [];
  console.log('BEFORE: ', bProfilesList);
  const updatedList = bProfilesList.filter((bProfile, i) => i !== index);
  console.log('AFTER: ', updatedList);
  await storage.setItem(BILLING_PROFILES, updatedList);
};

const createBillingProfile = async (billingProfile) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES) || [];
  bProfilesList.push({
    id: uuidv4(),
    ...billingProfile,
  });
  await storage.setItem(BILLING_PROFILES, bProfilesList);
};

const updateBillingProfileByIndex = async (updatedBillingProfile, index) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILES) || [];
  bProfilesList[index] = updatedBillingProfile;
  await storage.setItem(BILLING_PROFILES, bProfilesList);
};

const init = async (storageDir) => {
  await storage.init({
    dir: storageDir,
  });
};

module.exports = {
  init,
  listBillingProfiles,
  createBillingProfile,
  deleteBillingProfileByIndex,
  updateBillingProfileByIndex,
};
