import webpack from 'webpack';
import { BuildOptions } from '../types/config';
import babelPluginRemoveProps from '../../babel/babelPluginRemoveProps';

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isTsx }: BuildBabelLoaderProps): webpack.RuleSetRule {
  return {
    test: isTsx ? /\.[jt]sx?$/ : /\.[jt]s$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true,
            },
          ],
          [
            '@babel/plugin-transform-typescript',
            { isTSX: isTsx },
          ],
          '@babel/plugin-transform-runtime',
          isTsx && [
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
