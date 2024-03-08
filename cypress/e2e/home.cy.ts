// integration tests

describe("team analysis", () => {
  beforeEach(() => {
    // mock response
    cy.fixture("analysisResponse").then((response) => {
      cy.intercept("GET", "/api/analysis/bos", response).as("analysisRequest");
      cy.visit("http://localhost:3000");
    });

    cy.fixture("parseResponse").then((response) => {
      cy.intercept("GET", "/api/parse/bos", response).as("analysisRequest");
      cy.visit("http://localhost:3000");
    });
  });

  it("analyze a team", () => {
    cy.get("button").should("contain.text", "Submit");
    cy.get("input").type("bos");
    cy.get("button").click();
    cy.get(".mean").should("contain.text", "");
    cy.get(".median").should("contain.text", "");
    cy.get(".mode").should("contain.text", "");
  });

  it("up to date data", () => {
    cy.get("button").should("contain.text", "Submit");
    cy.get("input").type("bos");
    cy.get("button").click();
    cy.get(".games-played")
      .invoke("text")
      .then((text: string) => {
        const GAMES_PLAYED = parseInt(text);
        expect(GAMES_PLAYED).to.be.greaterThan(0);
      });
  });
});
