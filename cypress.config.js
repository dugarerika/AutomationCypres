const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
const cucumber = require('cypress-cucumber-preprocessor').default;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  if (!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
            on("before:browser:launch", (browser, launchOptions) => {
        if (["chrome", "edge"].includes(browser.name)) {
          launchOptions.args.push("--no-sandbox");
          launchOptions.args.push("--disable-gl-drawing-for-tests");
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--js-flags=--max-old-space-size=3500");
          launchOptions.args.push("--force-device-scale-factor=0.67");
        }
        return launchOptions;
      });
      // Cucumber plugin
      // on('file:preprocessor', cucumber());

      // ⚠️ Must be called before returning config
      allureWriter(on, config);

      const file = config.env.configFile || '';
      return getConfigurationByFile(file);
    },
    specPattern: "cypress/e2e/*/*/*.{js,jsx,ts,tsx,feature}",
    // baseUrl: "https://vendor.bookr-dev.com/",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: false,
    trashAssetsBeforeRuns: true,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    // reporter: 'mochawesome',
    // reporterOptions: {
    //   configFile: "reporterOpts.json"
    // },
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      allureReuseAfterSpec: true,
      SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
      URL_Staging: "https://vendor.bookr-dev.com/",
      URL_Production: "https://vendor.bookr.co/",
      URL_Deeplink_Staging_artnailcorner: "https://bookr-dev.com/vendors/athary-world-nail-",
      Vendor0_Admin_Username_Staging: "nailedit",
      Vendor0_Admin_Password_Staging: "1234567890",
      Vendor6_Admin_Username_Staging: "pinkdoor",
      Vendor6_Admin_Password_Staging: "1234567890",
      Vendor7_Admin_Username_Staging: "naqanails",
      Vendor7_Admin_Password_Staging: "1234567890",
      Vendor8_Admin_Username_Staging: "tigiconcept",
      Vendor8_Admin_Password_Staging: "1234567890",
      Vendor9_Admin_Username_Staging: "billingbh",
      Vendor9_Admin_Password_Staging: "1234567890",
      Vendor10_Admin_Username_Staging: "beautiquespa",
      Vendor10_Admin_Password_Staging: "1234567890",
      Vendor_Admin_Username_Staging: "artnailcorner",
      Vendor_Admin_Password_Staging: "erika123",
      Vendor_Staff_Username_Staging: "zumba11",
      Vendor_Staff_Password_Staging: "1234567890",
      Vendor_Staff1_Username_Staging: "erikat123",
      Vendor_Staff1_Password_Staging: "1234567890",
      Vendor_ReadOnly_Username_Staging: "readonly835",
      Vendor_ReadOnly_Password_Staging: "1234567890",
      Vendor_Receptionist_Username_Staging: "recep6",
      Vendor_Receptionist_Password_Staging: "1234567890",
      Vendor13_Admin_Username_Staging: "testsalon",
      Vendor13_Admin_Password_Staging: "testsalon1o",
      Vendor2_Admin_Username_Staging: "poshinpolish",
      Vendor2_Admin_Password_Staging: "1234567890",
      Vendor1_Admin_Username_Staging: "cococutsalon",
      Vendor1_Admin_Password_Staging: "1234567890",
      Vendor1_Staff_Username_Staging: "zumbacococut",
      Vendor1_Staff_Password_Staging: "1234567890",
      Vendor1_Low_Level_Username_Staging: "lowcococut",
      Vendor1_Low_Level_Password_Staging: "1234567890",
      Vendor1_ReadOnly_Username_Staging: "readonlyerika2",
      Vendor1_ReadOnly_Password_Staging: "1234567890",
      Vendor1_Receptionist_Username_Staging: "recepcococut1",
      Vendor1_Receptionist_Password_Staging: "1234567890",
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
      Vendor1_Admin_Username_Production: "testsalon",
      Vendor1_Admin_Password_Production: "testsalon@1o",
      Vendor1_Staff_Username_Production: "aura",
      Vendor1_Staff_Password_Production: "1234567890",
      Vendor1_ReadOnly_Username_Production: "readonly92",
      Vendor1_ReadOnly_Password_Production: "1234567890",
      Vendor1_Receptionist_Username_Production: "receptionist77",
      Vendor1_Receptionist_Password_Production: "1234567890",
    }
  }
});
