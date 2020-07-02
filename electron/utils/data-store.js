const storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const { BILLING_PROFILE } = require('../../src/shared/constants');

const listBillingProfiles = async () => await storage.getItem(BILLING_PROFILE) || [];

const deleteBillingProfileByIndex = async (index) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILE) || [];
  const updatedList = bProfilesList.filter((bProfile, i) => i !== index);
  await storage.setItem(BILLING_PROFILE, updatedList);
};

const createBillingProfile = async (billingProfile) => {
  const bProfilesList = await storage.getItem(BILLING_PROFILE) || [];
  bProfilesList.push({
    id: uuidv4(),
    ...billingProfile,
  });
  await storage.setItem(BILLING_PROFILE, bProfilesList);
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
  default: init,
};
