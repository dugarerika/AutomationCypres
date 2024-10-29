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
    baseUrl: "https://vendor.beta.bookr-dev.com/",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: false,
    trashAssetsBeforeRuns: true,
    video: false,
    videoUploadOnPasses: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    numTestsKeptInMemory: 10,
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
      },
    },
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      URL_OldVendor_Staging: "https://vendor.bookr-dev.com/",
      URL_BetaVendor_Staging: "https://vendor.beta.bookr-dev.com/",
      URL_OldVendor_Production: "https://vendor.bookr.co/",
      URL_BetaVendor_Production: "https://vendor-beta.bookr.co/",
      URL_Deeplink_Staging_artnailcorner: "https://customer.bookr-dev.com/vendors/athary-world-nail-",
      Vendor_Admin_Username_Staging: "artnailcorner",
      Vendor_Admin_Password_Staging: "1234567890",
      Vendor_Staff_Username_Staging: "zumba11",
      Vendor_Staff_Password_Staging: "1234567890",      
      Vendor_ReadOnly_Username_Staging: "readonly31",
      Vendor_ReadOnly_Password_Staging: "1234567890",   
      Vendor_Receptionist_Username_Staging: "recep6",
      Vendor_Receptionist_Password_Staging: "1234567890",      
      Vendor_Admin_Username_Production: "testsalon",
      Vendor_Admin_Password_Production: "testsalon1o"
    }
  },
});
