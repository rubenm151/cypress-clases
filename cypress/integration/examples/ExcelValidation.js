/// <reference types="Cypress" />

const excelToJson = require("convert-excel-to-json");
const { result } = require("cypress/types/lodash");
const { default: neatCsv } = require("neat-csv");
let productName;

describe("My Second Test Suite", function () {
  it("My First Test case", function () {
    // Remove async
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
    cy.contains('[routerlink*="cart"]').click();
    cy.contains("Checkout").click();
    cy.get('[placeholder*="Country"]').type("Ind");
    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text() === " India") {
        cy.wrap($el).click();
      }
    });
    cy.get(".action_submit").click();
    cy.wait(4000);
    cy.get(".order-summary button").contains("Excel").click();

    // Esperar a que el archivo se descargue y verificar la ruta del archivo
    const filePath =
      Cypress.config("fileServerFolder") +
      "/cypress/downloads/order-invoice_rubenm.xlsx";

    // Ahora usar cy.task para interactuar con el archivo del sistema
    cy.task("excelToJson", { filePath: filePath }).then((result) => {
      console.log(result);
      console.log(result.data[1].A);
      expect(productName).to.equal(result.data[1].B);
    });
    cy.readFile(filePath).then(function (text) {
      expect(text).to.include(productName);
    });
  });
});
