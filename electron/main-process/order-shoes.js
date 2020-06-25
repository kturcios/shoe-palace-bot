const { ipcMain } = require('electron');
const { ORDER_SHOES } = require('../../src/shared/constants');

ipcMain.on(ORDER_SHOES, (event, checkoutDetails) => {

});