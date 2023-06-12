import { Project } from 'ts-morph';
import path from 'path';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const sharedDir = project.getDirectory(
  path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'),
);
const componentDirs = sharedDir?.getDirectories();

const isAbsolutePath = (path: string) => {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => path.startsWith(layer));
};

componentDirs?.forEach((componentDir) => {
  const indexFilePath = `${componentDir.getPath()}/index.ts`;
  const indexFile = componentDir.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${componentDir.getBaseName()}';`;
    const file = componentDir.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

    file.save();
  }
});

files.forEach((file) => {
  const imports = file.getImportDeclarations();
  imports.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');
    const segments = valueWithoutAlias.split('/');

    const isSharedLayer = segments?.[0] === 'shared';
    const isUiComponent = segments?.[1] === 'ui';

    if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUiComponent) {
      const resultingValue = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${resultingValue}`);
    }
  });
});

project.saveSync();
