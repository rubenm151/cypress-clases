/// <reference types="Cypress" />

describe("My First Test Suite", function () {
  it("My FirstTest case", function () {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation with Java",
      isbn: "bcd",
      aisle: "227",
      author: "John foe"
    }).then((res) => {
      expect(res.body).to.have.property('Msg', 'successfully added');
      expect(res.status).to.eq(200)
    });
  });
});
