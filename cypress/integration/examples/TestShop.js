/// <reference types="Cypress" />

describe("Test Shop", function() {
  it("I fill contact info", function() {
    cy.visit("https://www.demoblaze.com/#");
    
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#recipient-email').type("email@gmail.com");
    cy.get('#recipient-name').type("Pepe");
    cy.get('#message-text').type("Mensaje de ejemplo");
    cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
  });
});


