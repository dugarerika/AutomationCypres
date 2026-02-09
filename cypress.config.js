const fs = require('fs-extra');
const path = require('path');
const { defineConfig } = require('cypress');

const allureWriter = require('@shelex/cypress-allure-plugin/writer');

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve(
		'cypress/config',
		`${file}.json`
	);

	if (!fs.existsSync(pathToConfigFile)) {
		console.log('No custom config file found.');
		return {};
	}

	return fs.readJsonSync(pathToConfigFile);
}

module.exports = defineConfig({
	e2e: {
		async setupNodeEvents(on, config) {
			// Cucumber plugin
			// await addCucumberPreprocessorPlugin(on, config);

			// // Use the esbuild plugin for preprocessing
			// on(
			// 	'file:preprocessor',
			// 	createBundler({
			// 		plugins: [
			// 			createEsbuildPlugin(config) // Use ESBuild plugin for preprocessing
			// 		]
			// 	})
			// );

			// Allure reporter
			allureWriter(on, config);

			// Browser launch options
			on(
				'before:browser:launch',
				(browser, launchOptions) => {
					if (
						[
							'chrome',
							'edge'
						].includes(browser.name)
					) {
						launchOptions.args.push(
							'--window-size=3840,2160',
							'--force-device-scale-factor=1',
							'--high-dpi-support=1',
							'--disable-gpu',
							'--no-sandbox',
							'--disable-logging',
							'--log-level=3'
						);
					}
					return launchOptions;
				}
			);

			// Merge environment-specific config (DO NOT replace config)
			const file = config.env.configFile;
			if (file) {
				const customConfig = getConfigurationByFile(file);
				return { ...config, ...customConfig };
			}

			return config;
		},

		// Spec pattern for test files
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',

		// Cypress settings
		chromeWebSecurity: false,
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 120000,
		screenshotOnRunFailure: false,
		trashAssetsBeforeRuns: true,
		video: false,
		viewportWidth: 3840,
		viewportHeight: 2160,
		experimentalMemoryManagement: true,
		numTestsKeptInMemory: 0,

		// Retry settings
		retries: {
			runMode: 2,
			openMode: 0
		},

		// Environment variables
		env: {
			allureReuseAfterSpec: true,
			// Slack webhook URL
			SLACK_WEBHOOK_URL:
				'https://hooks.slack.com/services/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',

			// Staging URLs
			URL_Staging: 'https://vendor.bookr-dev.com/',
			URL_Deeplink_Staging_artnailcorner:
				'https://bookr-dev.com/vendors/athary-world-nail-',

			// Production URLs
			URL_Production: 'https://vendor.bookr.co/',

			// Vendor 0 (Staging) credentials
			Vendor0_Admin_Username_Staging: 'nailedit',
			Vendor0_Admin_Password_Staging: '1234567890',

			// Vendor 6 (Staging) credentials
			Vendor6_Admin_Username_Staging: 'pinkdoor',
			Vendor6_Admin_Password_Staging: '1234567890',

			// Vendor 7 (Staging) credentials
			Vendor7_Admin_Username_Staging: 'naqanails',
			Vendor7_Admin_Password_Staging: '1234567890',

			// Vendor 8 (Staging) credentials
			Vendor8_Admin_Username_Staging: 'tigiconcept',
			Vendor8_Admin_Password_Staging: '1234567890',

			// Vendor 9 (Staging) credentials
			Vendor9_Admin_Username_Staging: 'billingbh',
			Vendor9_Admin_Password_Staging: '1234567890',

			// Vendor 10 (Staging) credentials
			Vendor10_Admin_Username_Staging: 'beautiquespa',
			Vendor10_Admin_Password_Staging: '1234567890',

			// Vendor admin and staff (Staging) credentials
			Vendor_Admin_Username_Staging: 'artnailcorner',
			Vendor_Admin_Password_Staging: 'erika123',
			Vendor_Staff_Username_Staging: 'zumba11',
			Vendor_Staff_Password_Staging: '1234567890',
			Vendor_Staff1_Username_Staging: 'erikat123',
			Vendor_Staff1_Password_Staging: '1234567890',
			Vendor_ReadOnly_Username_Staging: 'readonly835',
			Vendor_ReadOnly_Password_Staging: '1234567890',
			Vendor_Receptionist_Username_Staging: 'recep6',
			Vendor_Receptionist_Password_Staging: '1234567890',
			Vendor13_Admin_Username_Staging: 'testsalon',
			Vendor13_Admin_Password_Staging: 'testsalon1o',
			Vendor2_Admin_Username_Staging: 'poshinpolish',
			Vendor2_Admin_Password_Staging: '1234567890',
			Vendor1_Admin_Username_Staging: 'cococutsalon',
			Vendor1_Admin_Password_Staging: '1234567890',
			Vendor1_Staff_Username_Staging: 'zumbacococut',
			Vendor1_Staff_Password_Staging: '1234567890',
			Vendor1_Low_Level_Username_Staging: 'lowcococut',
			Vendor1_Low_Level_Password_Staging: '1234567890',
			Vendor1_ReadOnly_Username_Staging: 'readonlyerika2',
			Vendor1_ReadOnly_Password_Staging: '1234567890',
			Vendor1_Receptionist_Username_Staging:
				'recepcococut1',
			Vendor1_Receptionist_Password_Staging: '1234567890',

			// Vendor admin and staff (Production) credentials
			Vendor_Admin_Username_Production:
				'qatartestsalon3@mailinator.com',
			Vendor_Admin_Password_Production: '1234567890',
			Vendor_Staff_Username_Production: 'zumbacococut',
			Vendor_Staff_Password_Production: '1234567890',
			Vendor_Staff1_Username_Production: 'naomicococut',
			Vendor_Staff1_Password_Production: '1234567890',
			Vendor_ReadOnly_Username_Production: 'readonlyerika2',
			Vendor_ReadOnly_Password_Production: '1234567890',
			Vendor_Receptionist_Username_Production:
				'recepcococut',
			Vendor_Receptionist_Password_Production: '1234567890',
			Vendor1_Admin_Username_Production: 'testsalon',
			Vendor1_Admin_Password_Production: 'testsalon@1o',
			Vendor1_Staff_Username_Production: 'aura',
			Vendor1_Staff_Password_Production: '1234567890',
			Vendor1_ReadOnly_Username_Production: 'readonly92',
			Vendor1_ReadOnly_Password_Production: '1234567890',
			Vendor1_Receptionist_Username_Production:
				'receptionist77',
			Vendor1_Receptionist_Password_Production: '1234567890'
		}
	}
});
