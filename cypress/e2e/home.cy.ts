// integration tests

describe("team analysis", () => {
  beforeEach(() => {
    // mock response
    cy.fixture("analysisResponse").then((response) => {
      cy.intercept("GET", "/api/analysis/bos", response).as("analysisRequest");
      cy.visit("http://localhost:3000");
    });
  });

  it("analyze a team", () => {
    cy.get("button").should("contain.text", "Submit");
    cy.get("input").type("bos");
    cy.get("button").click();
    cy.get(".mean").should("contain.text", "");
  });
});
