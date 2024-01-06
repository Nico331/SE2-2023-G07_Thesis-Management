import { filter } from "cypress/types/bluebird";

describe("Student features", () => {

    const studentID = "s300003@studenti.polito.it";
    const studentPass = "s300003";

    beforeEach("login", () => {
        cy.viewport(1920, 1080);
        cy.visit("http://localhost:3000");
        
        cy.get(".btn-primary").click();

        cy.get("#formBasicEmail").type(studentID);
        cy.get("#formBasicPassword").type(studentPass);
        cy.get(".btn-primary").click();
    });

    const filterKeyword = "Machine Learning";
    const filterSearch = "Test Proposal Modified";
    const filterLevel = "Bachelor";

    it("Student checks proposals list and apply for a proposal and check the My applications page", () => {
        cy.get("#proposalList").click();
        // cy.get("#keywords").select(filterKeyword, {force: true});
        cy.get("#keywords").type(filterKeyword + "{enter}");
        cy.get("#cancel-filters").click();
        cy.get("#level").type(filterLevel + "{enter}");
        cy.get("#cancel-filters").click();
        cy.get("#search-box").type(filterSearch);
        cy.get("#search-btn").click();
        cy.contains("Test Proposal Modified").click();
        cy.get("#show-prop-details").click();
        cy.get("#apply-btn").click();
        cy.get("#apply-btn").click();
        cy.get("#apply-yes-btn").click();
        cy.get("#close-apply-btn").click();

        cy.get("#menu").click();
        cy.get("#menu-myapplications").click();
        cy.get(".btn-close-white").click();
    });

    it("Student withdraws from a proposal", () => {
        cy.get("#myAaplications").click();
        cy.contains("Test Proposal Modified").get("#withdraw-btn").click();
        cy.get("#withdraw-yes-btn").click();
    });

    const title = "Test Thesis Request";
    const supervisor = "p300001";
    const cosupervisor = ["p300002", "p300003"];
    const description = "Test Description";

    it("Student inserts a new thesis request and check the requests", () => {
        cy.get("#newThesisRequest").click();
        cy.get("#title").type(title);
        cy.get("#supervisor").select(supervisor);
        cy.get("#cosupervisor").select(cosupervisor[0]);
        cy.get("#add-cosup-btn").click();
        cy.get("#cosupervisor").select(cosupervisor[1]);
        cy.get("#add-cosup-btn").click();
        cy.get("#description").type(description);
        cy.get("#submit-btn").click();
        cy.get("#menu").click();
        cy.get("#menu-myThesisRequests").click();
    });

    const newTitle = "Test Thesis Request Modified";
    const delcosup = "p300003";

    it("Student modifies and deletes a thesis request", () => {
        cy.get("#myThesisRequest").click();
        cy.get("#edit-mode-btn").click();
        cy.get("#title").clear().type(newTitle);
        cy.get(`#remove-${delcosup}-btn`).click();
        cy.get("#modify-req-btn").click();
        cy.get("#myThesisRequest").click();
        cy.get("#edit-mode-btn").click();
        cy.get("#delete-btn").click();
        cy.get("#delete-yes-btn").click();
    });

    it("Student inserts a new thesis request and check the requests", () => {
        cy.get("#newThesisRequest").click();
        cy.get("#title").type("Test Thesis Request Modified");
        cy.get("#supervisor").select(supervisor);
        cy.get("#cosupervisor").select(cosupervisor[0]);
        cy.get("#add-cosup-btn").click();
        cy.get("#cosupervisor").select(cosupervisor[1]);
        cy.get("#add-cosup-btn").click();
        cy.get("#description").type(description);
        cy.get("#submit-btn").click();
        cy.get("#menu").click();
        cy.get("#menu-myThesisRequests").click();
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

});