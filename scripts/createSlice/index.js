const createTemplate = require('./templates/createTemplate.js');

const layer = process.argv[2];
const slice = process.argv[3];

const layers = ['features', 'entities', 'pages'];

if (!layer) {
  console.error('Missing layer name');
  process.exit(1);
}

if (!layers.includes(layer)) {
  console.error(
    `Invalid layer: ${layer}. Must be one of: ${layers.join(', ')}`,
  );
  process.exit(1);
}

if (!slice) {
  console.error('Missing slice name');
  process.exit(1);
}

createTemplate(layer, slice).catch((err) => {
  console.error('Error creating slice', '\n', err);
  process.exit(1);
});
