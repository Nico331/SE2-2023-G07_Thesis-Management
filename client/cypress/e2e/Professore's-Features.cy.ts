
describe("Professore's features", () => {

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
    cy.viewport(1920, 1080);
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

  const newTitle = "Test Proposal Modified";
  const newLevel = "Bachelor";
  const newExp = "2024-03-05";
  const newType = "Experimental";
  const cosupervisorID = "p300003";
  const newCosupervisorID = "p300004";
  const removeKeyword = "Artificial Neural Networks";
  const newKeyword = "Machine Learning";
  const newRequiredKnowledge = ", python";
  const newCds = "Computer Science";

  it("Edit a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal").find("#modify-btn").click();
    cy.get("#title").clear().type(newTitle);
    cy.get("#type").select(newType);
    cy.get("#level").select(newLevel);
    cy.get("#exp").clear().type(newExp);
    cy.get("#remove-" + cosupervisorID).click();
    cy.get("#cosupervisor").select(newCosupervisorID);
    cy.get("#add-cosup-button").click();
    cy.get("#remove-" + keywords.indexOf(removeKeyword)).click();
    cy.get("#keyword-input").type(newKeyword);
    cy.get("#add-keyword-btn").click();
    cy.get("#requiredKnoledge").type(newRequiredKnowledge);
    cy.get("#cds-input").type(newCds);
    cy.get("#add-cds-btn").click();
    cy.get("#update-btn").click();
    cy.get("#close-modal-btn").click();
  });

  const studentName = "Michael Johnson";

  it("Accept or reject an application", () => {
    cy.get("#my-proposal").click();
    cy.contains("Test Proposal Copied").click();
    cy.contains("Student: " + studentName).within(() => {
      cy.get("#accept-btn").click();
    })
    cy.get("#accept-yes-btn").click();
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

  const deletedTitle = "Test Proposal Copied";

  it("Delete a proposal", () => {
    cy.get("#my-proposal").click();
    cy.contains(deletedTitle).find("#delete-btn").click();
    cy.get("#delete-yes-btn").click();
  });

  const newTopic = "Test Topic";
  const topicThesis = "Test Proposal Modified";
  const topicDescription = "Test Description";
  const topicVisibility = "Public";

  it("Create a new topic in the forum", () => {
    cy.get("#forum").click();
    cy.get("#new-topic-btn").click();
    cy.get("#name").type(newTopic);
    cy.get("#thesis").select(topicThesis);
    cy.get("#description").type(topicDescription);
    cy.get("#visibility").select(topicVisibility);
    cy.get("#create-btn").click();
  });

  const date = "2024-06-24T00:00:00";

  it("Change the VC", () => {
    cy.get("#vc-input").clear().type(date);
    cy.get("#set-btn").click({force: true});
    cy.wait(4000);
    cy.get("#reset-btn").click();
  });

  it("Logout", () => {
    cy.wait(4000);
    cy.get("#menu").click();
    cy.get("#menu-logout").click();
  });

});