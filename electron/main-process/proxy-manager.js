const { app, ipcMain } = require('electron');
const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const logger = require('electron-log');
const { join } = require('path');
const {
  LIST_PROXIES,
  CREATE_PROXY,
  UPDATE_PROXY,
  DELETE_PROXY,
} = require('../../src/shared/constants');

const storageDir = join(app.getPath('appData'), app.getName(), 'Proxies');

let db = null;

const init = async () => {
  logger.info('Attempting to initialize proxy storage...');
  db = await Storage.create({
    dir: storageDir,
  });
  await db.init();
  logger.info(`Proxy storage initialized: ${storageDir}`);
};

ipcMain.handle(LIST_PROXIES, async () => {
  if (db === null) {
    await init();
  }
  logger.info('Attempting to list proxies...');
  const proxies = await db.values();
  logger.info('Proxy list: ', JSON.stringify(proxies, null, 2));
  return proxies;
});

ipcMain.handle(CREATE_PROXY, async (event, proxyDef) => {
  if (db === null) {
    await init();
  }
  const id = uuidv4();
  const newProxy = {
    id,
    ...proxyDef,
  };
  logger.info('Attempting to create a new proxy...', JSON.stringify(newProxy, null, 2));
  await db.setItem(id, newProxy);
  logger.info(`New proxy successfully created: ${newProxy}`);
});

ipcMain.handle(UPDATE_PROXY, async (event, proxy) => {
  if (db === null) {
    await init();
  }
  logger.info(`Attempting to update proxy ${proxy.id}...`);
  await db.updateItem(proxy.id, proxy);
  logger.info(`Proxy successfully updated: ${proxy.id}`);
});

ipcMain.handle(DELETE_PROXY, async (event, id) => {
  if (db === null) {
    await init();
  }
  logger.info(`Attempting to delete proxy ${id}`);
  await db.removeItem(id);
  logger.info(`Proxy deleted: ${id}`);
});
