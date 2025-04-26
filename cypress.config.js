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
  
  viewportWidth: 1200,
  viewportHeight: 1000,
  // reporter: 'reporters/custom.js',
  projectId: 'mevvq9',
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      // implement node event listeners here
      const file = config.env.configFile || ''

      return getConfigurationByFile(file)
    },
    specPattern: "cypress/e2e/stagingBetaVendor/calendar/*.{js,jsx,ts,tsx,feature}",
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
    // reporter: 'cypress-mochawesome-reporter',
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporterOpts.json"
    },
    e2e: {
      setupNodeEvents(on, config) {
        // require('cypress-mochawesome-reporter/plugin')(on);
      },
    },
    retries: {
      runMode: 2,
      openMode: 2
    },
    env: {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',

      //STAGING
      URL_OldVendor_Staging: "https://vendor.bookr-dev.com/",
      URL_BetaVendor_Staging: "https://vendor.beta.bookr-dev.com/",
      URL_OldVendor_Production: "https://vendor.bookr.co/",
      URL_BetaVendor_Production: "https://vendor-beta.bookr.co/",
      URL_Deeplink_Staging_artnailcorner: "https://customer.bookr-dev.com/vendors/athary-world-nail-",
      Vendor0_Admin_Username_Staging: "naqanails",
      Vendor0_Admin_Password_Staging: "1234567890",
      Vendor9_Admin_Username_Staging: "billingbh",// it has billing pendin to pay
      Vendor9_Admin_Password_Staging: "1234567890",
      // Vendor1_Admin_Username_Staging: "beautiquespa",
      // Vendor1_Admin_Password_Staging: "1234567890",
      //STAGING - BETA VENDOR
      Vendor_Admin_Username_Staging: "artnailcorner",
      Vendor_Admin_Password_Staging: "1234567890",
      Vendor_Staff_Username_Staging: "zumba11",
      Vendor_Staff_Password_Staging: "1234567890",   
      Vendor_Staff1_Username_Staging: "erikat123",
      Vendor_Staff1_Password_Staging: "1234567890",    
      Vendor_ReadOnly_Username_Staging: "readonly835",
      Vendor_ReadOnly_Password_Staging: "1234567890",   
      Vendor_Receptionist_Username_Staging: "recep6",
      Vendor_Receptionist_Password_Staging: "1234567890",   
      
      //STAGING - OLD VENDOR
      Vendor1_Admin_Username_Staging: "cococutsalon",
      Vendor1_Admin_Password_Staging: "1234567890",
      Vendor1_Staff_Username_Staging: "zumbacococut",
      Vendor1_Staff_Password_Staging: "1234567890", 
      Vendor1_ReadOnly_Username_Staging: "readonlyerika2",
      Vendor1_ReadOnly_Password_Staging: "1234567890",  
      Vendor1_Receptionist_Username_Staging: "recepcococut",
      Vendor1_Receptionist_Password_Staging: "1234567890",   
      
      /// PRODUCTION - BETA VENDOR
      Vendor_Admin_Username_Production: "qatartestsalon3@mailinator.com",
      Vendor_Admin_Password_Production: "1234567890",
      Vendor_Staff_Username_Production: "zumbacococut",
      Vendor_Staff_Password_Production: "1234567890",
      Vendor_Staff1_Username_Production: "naomicococut",
      Vendor_Staff1_Password_Production: "1234567890",
      Vendor_ReadOnly_Username_Production: "readonlyerika2",
      Vendor_ReadOnly_Password_Production: "1234567890",   
      Vendor_Receptionist_Username_Production: "recepcococut",
      Vendor_Receptionist_Password_Production: "1234567890",    

      /// PRODUCTION - OLD VENDOR
      Vendor1_Admin_Username_Production: "testsalon",
      Vendor1_Admin_Password_Production: "testsalon@1o",
      Vendor1_Staff_Username_Production: "aura",
      Vendor1_Staff_Password_Production: "1234567890",
      Vendor1_ReadOnly_Username_Production: "readonly92",
      Vendor1_ReadOnly_Password_Production: "1234567890",   
      Vendor1_Receptionist_Username_Production: "receptionist77",
      Vendor1_Receptionist_Password_Production: "1234567890",    
    }
  },
});
