/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const contractSection = () => {
    cy.visit(Cypress.expose("URL_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.wait(159)
    cy.contains('li>button','Contracts').should('exist')
    cy.contains('li>button','Contracts').click({ force: true })
}

describe('Beta Vendor Admin | Employee | Contracts | logged with Admin credentials', () => {

    beforeEach(() => {
        cy.loginprod('Receptionist Session', Cypress.expose("Vendor_Receptionist_Username_Production"), Cypress.expose("Vendor_Receptionist_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it.only('Verify it is possible access to the Contracts section- Admin credentials', () => {
        contractSection()
        cy.contains('div>h6','Contracts').should('exist')
    })

// Add Employee Successfully
// LOW Permission Level
    it('Verify it is possible to add an Employee with role Readonly by filling up All the required info, selecting all services and adding ', () => {
        payrollSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('Low')
        cy.selectAllServices()
        cy.expectedMessageCreateEmployee('Employee created')
    })
})