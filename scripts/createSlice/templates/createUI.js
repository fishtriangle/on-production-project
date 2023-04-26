const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharToUpperCase = require('../firstCharToUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

module.exports = async (layer, slice) => {
  const resolveUIPath = (...segments) => resolveRoot('src', layer, slice, 'ui', ...segments);

  const createUIStructure = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (err) {
      console.error('Failed to create ui structure', '\n', err);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharToUpperCase(slice);
      await fs.mkdir(resolveUIPath(componentName));
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (err) {
      console.error('Failed to create component', '\n', err);
    }
  };

  await createUIStructure();
  await createComponent();
};
