/// <reference types="Cypress" />

const { default: neatCsv } = require("neat-csv");
let productName;

describe("My Second Test Suite", function () {
  it("My First Test case", async () => {
    cy.LoginApi().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });

    cy.get(".card-body b")
      .eq(1)
      .then(function (el) {
        productName = el.text(); // Almacena el texto en la variable productName
      });

    cy.get(".card-body button:last-of-type").eq(1).click();
    productName.replace
    cy.contains("[routerlink*='cart']").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("Ind");
    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text() === " India") {
        cy.wrap($el).click();
      }
    });
    cy.get(".action_submit").click();
    cy.wait(4000);
    cy.get(".order-summary button").click();

    cy.readFile(
      Cypress.config("fileServerFolder") + "/cypressdownloads/miarchivo.txt"
    ).then(async (fileContent) => {
      const csv = await neatCsv(fileContent);
      const CSVProducts = csv[0]["product Name"]; // Para acceder propiedades de un objeto si no están juntas, tipo: productName
      expect(productName.toLowerCase()).to.equal(CSVProducts.toLowerCase());
      //TAMBIEN SE PUEDE HACER EN ARCHIVOS CSV
      cy.readFile(filePath).then(function (text) {
        expect(text).to.include(productName);
      });
    });
  });
});
