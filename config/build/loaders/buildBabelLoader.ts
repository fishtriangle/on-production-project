import webpack from 'webpack';

import babelPluginRemoveProps from '../../babel/babelPluginRemoveProps';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isTsx, isDev }: BuildBabelLoaderProps): webpack.RuleSetRule {
  const isProd = !isDev;
  return {
    test: isTsx ? /\.[jt]sx?$/ : /\.[jt]s$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            { isTSX: isTsx },
          ],
          '@babel/plugin-transform-runtime',
          isTsx && isProd && [
            babelPluginRemoveProps,
            {
              props: ['data-testid'],
            },
          ],
        ].filter(Boolean),
      },
    },
  };
}
