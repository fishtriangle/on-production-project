import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const isAbsolutePath = (path: string) => {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => path.startsWith(layer));
};

files.forEach((file) => {
  const imports = file.getImportDeclarations();
  imports.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolutePath(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.saveSync();
