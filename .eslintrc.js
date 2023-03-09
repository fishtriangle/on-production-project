module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
  rules: {
    indent: [2, 2],
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.tsx'],
    }],
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      peerDependencies: true,
    }],
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'i18next/no-literal-string': ['error'],
    'max-len': ['error', {
      ignoreComments: true,
      code: 120,
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
  globals: {
    __IS_DEV__: true,
    __API_BASE__: true,
    React: true,
  },
  overrides: [{
    files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
    rules: {
      'i18next/no-literal-string': 'off',
      'max-len': 'off',
    },
  }],
};
