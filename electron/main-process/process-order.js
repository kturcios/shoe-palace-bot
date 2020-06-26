const { ipcMain } = require('electron');
const logger = require('electron-log');
const { PROCESS_ORDER } = require('../../src/shared/constants');
const { order } = require('../utils/shoe-palace-checkout');

ipcMain.handle(PROCESS_ORDER, async (event, orderInfo) => {
  logger.info(orderInfo);
  await order(orderInfo);
});
