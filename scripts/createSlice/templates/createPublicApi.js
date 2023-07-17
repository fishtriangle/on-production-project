const fs = require('fs/promises');

const firstCharToUpperCase = require('../firstCharToUpperCase');
const resolveRoot = require('../resolveRoot');

module.exports = async (layer, slice) => {
  const component = firstCharToUpperCase(slice);
  const schema = `${slice}Schema`;

  try {
    await fs.writeFile(
      resolveRoot('src', layer, slice, 'index.ts'),
      `export { ${component} } from './ui/${component}/${component}';
export type { ${firstCharToUpperCase(
        schema,
      )} } from './model/types/${schema}';`,
    );
  } catch (err) {
    console.error('Failed to create public api', '\n', err);
  }
};
