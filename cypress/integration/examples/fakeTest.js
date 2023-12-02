/// <reference types="Cypress" />

describe("My First Test Suite", function () {
  it("My First Test case", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookRetrievals");
    cy.get(".btn.btn-primary").click();
    cy.wait("@bookRetrievals").should(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
      response.body.length;
    });
    cy.get("p").should(" not.have.text", "Sorry we only have one book available");

    //length of the response array = rows of the table
  });
});
