const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
const cucumber = require('cypress-cucumber-preprocessor').default;

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  reporter: 'reporters/custom.js',
  projectId: 'mevvq9',
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      // implement node event listeners here
      const file = config.env.configFile || ''

      return getConfigurationByFile(file)
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    //excludeSpecPattern: "cypress/e2e/other/*.js",
    baseUrl: "http://www.webdriveruniversity.com",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: false,
    videoUploadOnPasses: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    numTestsKeptInMemory: 100,
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
      },
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    env: {
      webdriveruni_homepage: "http://www.webdriveruniversity.com",
      first_name: "Sarah"
    }
  },
});
