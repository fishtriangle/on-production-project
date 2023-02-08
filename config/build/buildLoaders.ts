import webpack from 'webpack';
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {
  const babelLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        // plugins: [
        //   [
        //     "i18next-extract",
        //     {
        //       locales: ['ru', 'en'],
        //       keyAsDefaultValue: true,
        //     }
        //   ],
        // ],
      }
    }
  }

  const tsLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            localIdentName: isDev
              ? '[path][name]__[local]'
              : '[hash:base64:8]'
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
      ],
    };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: '@svgr/webpack',
  }

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2?)$/i,
    type: 'asset/resource',
  }

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    tsLoader,
    scssLoader,
  ]
}
