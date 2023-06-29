import path from 'path';

import webpack, { DefinePlugin, RuleSetRule } from 'webpack';

import { buildScssLoader } from '../build/loaders/buildScssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };
  config!.resolve!.alias = { '@': paths.src };
  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.extensions!.push('.ts', '.tsx');

  // @ts-ignore
  config!.module!.rules = config!.module!.rules!.map(
    (rule: RuleSetRule | '...') => {
      if (rule !== '...' && /svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    },
  );

  config!.module!.rules.push(buildSvgLoader());

  config!.module!.rules.push(buildScssLoader(true));

  config!.plugins!.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API_BASE__: JSON.stringify('https://testapi.com'),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  return config;
};
