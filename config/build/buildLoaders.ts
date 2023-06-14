import webpack from 'webpack';

// import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildScssLoader } from './loaders/buildScssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  // const tsLoader = {
  //   test: /\.[jt]sx?$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         transpileOnly: isDev,
  //       },
  //     },
  //   ],
  // };

  const scssLoader = buildScssLoader(isDev);

  const svgLoader = buildSvgLoader();

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2?)$/i,
    type: 'asset/resource',
  };

  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    // tsLoader,
    scssLoader,
  ];
}
