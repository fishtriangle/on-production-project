import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildScssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            localIdentName: isDev
              ? '[path][name]__[local]'
              : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };
}
