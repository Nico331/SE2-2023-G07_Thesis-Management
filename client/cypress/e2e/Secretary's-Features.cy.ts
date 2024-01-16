
describe("Secretary's features", () => {

    const secretaryID = "secretary01@polito.it";
    const secretaryPass ="secretary01";

    beforeEach("Login", () =>{
        cy.viewport(1920, 1080);
        cy.visit("http://localhost:3000");

        cy.get(".btn-primary").click();

        cy.get("#formBasicEmail").type(secretaryID);
        cy.get("#formBasicPassword").type(secretaryPass);
        cy.get(".btn-primary").click();
    });

    const title = "Thesis Reqeusst of Student 1";

    it("Secretary checkes the details of a request proposal and accepts it", () => {
        cy.get("#req-proposals").click();
        cy.contains(title).click();
        cy.get("#accept-btn").click();
        cy.get("#accept-yes-btn").click();
        cy.get(".btn-close").click();
    });
});