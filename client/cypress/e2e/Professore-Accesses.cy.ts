
describe("Professore Accesses", () => {

  const professorID = "p300001@polito.it";
  const professorPass = "p300001";

  const title = "Test Proposal";
  const type = "Development";
  const level = "Masters";
  const exp = "2024-02-04";
  const cosupervisor = "p300003";
  const eCosupervisorName = "Soheil";
  const eCosupervisorSurname = "Jamshidi";
  const eCosupervisorEmail = "soheil0013@gmail.com";
  const group = "DAUIN";
  const keywords = ["Artificial Intelligence", "Artificial Neural Networks", "Neural Networks"];
  const description = "Development of a predictive control model with innovative techniques of machine learning for the control of heating and cooling of buildings";
  const requiredKnowledge = "C++, machine learning";
  const notes = "The thesis project could be used by an external company";
  const cds = "Computer Engineering";
  
  beforeEach("login", () => {
    cy.visit("http://localhost:3000");

    cy.get(".btn-primary").click();

    cy.get("#formBasicEmail").type(professorID);
    cy.get("#formBasicPassword").type(professorPass);
    cy.get(".btn-primary").click();
  });

  it("new proposal", () => {
    cy.get("#new-proposal").click();
    cy.get("#title").type(title);
    cy.get("#type").select(type);
    cy.get("#level").select(level);
    cy.get("#exp").clear().type(exp);
    cy.contains("Internal").click();
    cy.get("#cosupervisor").select(cosupervisor);
    cy.get("#add-cosup-button").click();
    cy.contains("External").click();
    cy.get("#name-input").type(eCosupervisorName);
    cy.get("#surname-input").type(eCosupervisorSurname);
    cy.get("#email-input").type(eCosupervisorEmail);
    cy.get("#add-cosup-button").click();
    cy.get("#group-input").type(group);
    cy.get("#add-group-btn").click();
    cy.get("#keyword-input").type(keywords[0]);
    cy.get("#add-keyword-btn").click();
    cy.get("#keyword-input").type(keywords[1]);
    cy.get("#add-keyword-btn").click();
    cy.get("#keyword-input").type(keywords[2]);
    cy.get("#add-keyword-btn").click();
    cy.get("#description").type(description);
    cy.get("#requiredKnoledge").type(requiredKnowledge);
    cy.get("#notes").type(notes);
    cy.get("#cds-input").type(cds);
    cy.get("#add-cds-btn").click();
    cy.get("#submit-btn").click();
  });

  const cosupervisorID = "p300003";
  const removeKeyword = "Artificial Neural Networks";
  const newRequiredKnowledge = ", python";
  const newCds = "Computer Science";

  it("Edit a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal").find("#modify-btn").click();
    cy.get("#title").clear().type("Test Proposal Modified");
    cy.get("#type").select("Experimental");
    cy.get("#level").select("Bachelor");
    cy.get("#exp").clear().type("2024-03-05");
    cy.get("#remove-" + cosupervisorID).click();
    cy.get("#cosupervisor").select("p300004");
    cy.get("#add-cosup-button").click();
    cy.get("#remove-" + keywords.indexOf(removeKeyword)).click();
    cy.get("#keyword-input").type("Machine Learning");
    cy.get("#add-keyword-btn").click();
    cy.get("#requiredKnoledge").type(newRequiredKnowledge);
    cy.get("#cds-input").type(newCds);
    cy.get("#add-cds-btn").click();
    cy.get("#update-btn").click();
    cy.get("#close-modal-btn").click();
  });

  it("Copy a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal Modified").find("#copy-btn").click();
    cy.get("#title").clear().type("Test Proposal Copied");
    cy.get("#create-copy-btn").click();
    cy.get("#close-modal-btn").click();
  });

  it("Archive and restore a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal Copied").find("#archive-btn").click();
    cy.get("#arch-yes-btn").click();
    cy.get("#menu").click();
    cy.get("#menu-archive").click();
    cy.get(".btn-close-white").click();
    cy.contains("Test Proposal Copied").find("#restore-btn").click();
    cy.get("#update-btn").click();
    cy.get("#menu").click();
    cy.get("#menu-myproposals").click();
    cy.get(".btn-close-white").click();
  });

  it("Delete a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal Copied").find("#delete-btn").click();
    cy.get("#delete-yes-btn").click();
  });

  it("Create a new topic in the forum", () => {
    cy.get("#forum").click();
    cy.get("#new-topic-btn").click();
    cy.get("#name").type("Test Topic");
    cy.get("#thesis").select("Test Proposal");
    cy.get("#description").type("Test Description");
    cy.get("#visibility").select("Public");
    cy.get("#create-btn").click();
  });

});