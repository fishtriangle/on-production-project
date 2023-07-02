import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
  switch (mode) {
    case 'development':
      return apiUrl ?? 'http://localhost:8888';
    case 'production':
      return apiUrl ?? '/api';
    default:
      throw new Error('Invalid mode');
  }
}

export default (env: BuildEnv) => {
  const mode = env?.mode || 'development';
  const isDev = mode === 'development';
  const PORT = env?.port || 3001;
  const apiUrl = getApiUrl(mode, env?.apiUrl);

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  };

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: 'frontend',
  });

  return config;
};
