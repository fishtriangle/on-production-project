const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

module.exports = async (layer, slice) => {
  const resolveModelPath = (...segments) => resolveRoot('src', layer, slice, 'model', ...segments);

  const createModelStructure = async () => {
    try {
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (err) {
      console.error('Failed to create model structure', '\n', err);
    }
  };

  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('slices', `${slice}Slice.ts`),
        reduxSliceTemplate(slice),
      );
    } catch (err) {
      console.error('Failed to create redux slice', '\n', err);
    }
  };

  const createSchemaType = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('types', `${slice}Schema.ts`),
        schemaTypeTemplate(slice),
      );
    } catch (err) {
      console.error('Failed to create schema type', '\n', err);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
};
