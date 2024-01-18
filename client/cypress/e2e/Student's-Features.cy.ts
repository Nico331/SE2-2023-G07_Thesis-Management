
describe("Student features", () => {

    const studentID = "s300001@studenti.polito.it";
    const studentPass = "s300001";

    beforeEach("login", () => {
        cy.viewport(1920, 1080);
        cy.visit("http://localhost:3000");
        
        cy.get(".btn-primary").click();

        cy.get("#formBasicEmail").type(studentID);
        cy.get("#formBasicPassword").type(studentPass);
        cy.get(".btn-primary").click();
    });

    const filterKeyword = "Machine Learning";
    const filterSearch = "Cybersecurity Measures in Financial Technology";
    const filterLevel = "Bachelor";

    it("Student checks proposals list and apply for a proposal and check the My applications page", () => {
        cy.get("#proposalList").click();
        cy.get('#keywords > .css-13cymwt-control > .css-1fdsijx-ValueContainer > .css-qbdosj-Input > input').type(filterKeyword + "{enter}", {force: true});
        cy.get("#cancel-filters").click();
        cy.get("#level > .css-13cymwt-control > .css-1fdsijx-ValueContainer > .css-qbdosj-Input > input").type(filterLevel + "{enter}", {force: true});
        cy.get("#cancel-filters").click();
        cy.get("#search-box").type(filterSearch, {force: true});
        cy.get("#search-btn").click();
        cy.contains("Cybersecurity Measures in Financial Technology").click();
        cy.get("#details-btn").click();
        cy.get("#apply-btn").click();
        cy.get("#apply-btn").click();
        cy.get("#apply-yes-btn").click();
        cy.get("#close-apply-btn").click();

        cy.get("#menu").click();
        cy.get("#menu-myapplications").click();
    });

    it("Student withdraws from a proposal", () => {
        cy.get("#myAaplications").click();
        cy.contains("Cybersecurity Measures in Financial Technology").get("#withdraw-btn").click();
        cy.get("#withdraw-yes-btn").click();
    });

    const title = "Test Thesis Request";
    const supervisor = "p300001";
    const cosupervisor = ["p300002", "p300003"];
    const description = "Test Description";

    it("Student inserts a new thesis request and check the requests", () => {
        cy.get("#newThesisRequest").click();
        cy.get("#title-input").type(title);
        cy.get("#supervisor-input").select(supervisor);
        cy.get("#cosupervisor-input").select(cosupervisor[0]);
        cy.get("#add-cosup-btn").click();
        cy.get("#cosupervisor-input").select(cosupervisor[1]);
        cy.get("#add-cosup-btn").click();
        cy.get("#description-input").type(description);
        cy.get("#submit-btn").click();
        cy.get("#menu").click();
        cy.get("#menu-myThesisRequests").click();
    });

    const newTitle = "Test Thesis Request Modified";
    const delcosup = "p300003";

    it("Student modifies and deletes a thesis request", () => {
        cy.get("#myThesisRequest").click();
        cy.get("#edit-mode-btn").click();
        cy.get("#title-input").clear().type(newTitle);
        cy.get(`#remove-${delcosup}-btn`).click();
        cy.get("#modify-req-btn").click();
        cy.get("#myThesisRequest").click();
        cy.get("#edit-mode-btn").click();
        cy.get("#delete-btn").click();
        cy.get("#delete-yes-btn").click();
    });

    it("Student inserts a new thesis request and check the requests", () => {
        cy.get("#newThesisRequest").click();
        cy.get("#title-input").type("Thesis Reqeusst of Student 1");
        cy.get("#supervisor-input").select(supervisor);
        cy.get("#cosupervisor-input").select(cosupervisor[0]);
        cy.get("#add-cosup-btn").click();
        cy.get("#cosupervisor-input").select(cosupervisor[1]);
        cy.get("#add-cosup-btn").click();
        cy.get("#description-input").type(description);
        cy.get("#submit-btn").click();
        cy.get("#menu").click();
        cy.get("#menu-myThesisRequests").click();
    });

    const newTopic = "Details of Thesis Request of Student 1";
    const topicThesis = "Thesis Reqeusst of Student 1";
    const topicDescription = "Test Description";
    const topicVisibility = "Public";

    it("Create a new topic in the forum and send a meesage", () => {
    cy.get("#forum").click();
    cy.get("#new-topic-btn").click();
    cy.get("#name-input").type(newTopic);
    cy.get("#thesis-input").type(topicThesis + "{enter}");
    cy.get("#description-input").type(topicDescription);
    cy.get("#visibility-input").select(topicVisibility);
    cy.get("#create-btn").click();
    cy.contains(newTopic).then(() => {cy.get("#open-discussion-btn").click()});
    cy.get("#message-input").type("Please, give me more details about your thesis request");
    cy.get("#send-btn").click();
  });

});