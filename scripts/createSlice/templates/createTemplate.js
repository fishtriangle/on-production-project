const fs = require('fs/promises');

const createModel = require('./createModel');
const createPublicApi = require('./createPublicApi');
const createUI = require('./createUI');
const resolveRoot = require('../resolveRoot');

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
