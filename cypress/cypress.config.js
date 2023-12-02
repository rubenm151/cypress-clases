const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const path = require("path"); // Make sure to require 'path'

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  // Custom task for converting Excel to JSON
  on("task", {
    excelToJson: ({ filePath }) => {
      const result = excelToJson({
        sourceFile: filePath,
      });
      return result;
    },
  });

  // Add additional configuration for Cucumber JSON output
  const cucumberJsonConfig = {
    outputFolder: "cypress/cucumber-json", // Define the folder for JSON output
    generateTestRunnerHtmlReport: false, // If you don't want to generate the default HTML report
  };

  on("after:spec", async (spec, results) => {
    if (results && results.stats.failures === 0 && !results.video) {
      // Delete the video if the test passed and video was not necessary
      await fs.promises.unlink(
        path.join(
          config.projectRoot,
          config.videosFolder,
          `${spec.relative}.mp4`
        )
      ).catch((e) => console.error('Failed to delete video', e));
    }
  });

  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 1,
  },
  projectId: "nodpcq",
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/integration/**/*.js", 
    supportFile: "cypress/support/e2e.js",
  },
});

// You will need to add post-test scripts to generate HTML reports from JSON
