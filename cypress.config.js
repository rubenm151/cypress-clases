const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí deberías retornar un objeto de configuración
      return {
        specPattern: "cypress/integration/**/*.js",
        supportFile: "cypress/support/e2e.js",
      };
    }
  },
});
