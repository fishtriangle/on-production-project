import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    baseUrl: 'http://localhost:3000/',
    experimentalOriginDependencies: true,
  },

  // experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
