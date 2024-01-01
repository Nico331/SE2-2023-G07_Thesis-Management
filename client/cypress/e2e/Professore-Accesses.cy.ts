
describe("Professore Accesses", () => {
  
  before("login", () => {
    cy.visit("http://localhost:3000");

    cy.get(".btn-primary").click();

    cy.get("#formBasicEmail").type("p300001@polito.it");
    cy.get("#formBasicPassword").type("p300001");
    cy.get(".btn-primary").click();
  });

  it("new proposal", () => {
    cy.get("#new-proposal").click();
    cy.get("#title").type("Machine learning techniques for optimizing energy consumption in buildings");
    cy.get("#type").select("Development");
    cy.get("#level").select("Masters");
    cy.get("#exp").clear().type("2024-02-04");
    cy.contains("Internal").click();
    cy.get("#cosupervisor").select("p300003");
    cy.get("#add-cosup-button").click();
    cy.contains("External").click();
    cy.get("#name-input").type("Soheil");
    cy.get("#surname-input").type("Jamshidi");
    cy.get("#email-input").type("soheil0013@gmail.com");
    cy.get("#add-cosup-button").click();
    cy.get("#group-input").type("DAUIN");
    cy.get("#add-group-btn").click();
    cy.get("#keyword-input").type("Artificial Intelligence");
    cy.get("#add-keyword-btn").click();
    cy.get("#keyword-input").type("Artificial Neural Networks");
    cy.get("#add-keyword-btn").click();
    cy.get("#keyword-input").type("Neural Networks");
    cy.get("#add-keyword-btn").click();
    cy.get("#description").type("Development of a predictive control model with innovative techniques of machine learning for the control of heating and cooling of buildings");
    cy.get("#requiredKnoledge").type("C++, machine learning");
    cy.get("#notes").type("The thesis project could be used by an external company");
    cy.get("#cds-input").type("Computer Engineering");
    cy.get("#add-cds-btn").click();
    cy.get("#submit-btn").click();
  });
});