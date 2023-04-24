const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, slice) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, slice), { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory ${slice}`, '\n', err);
  }

  await createModel(layer, slice);
  await createUI(layer, slice);
  await createPublicApi(layer, slice);
};
