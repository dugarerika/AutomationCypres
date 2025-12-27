/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const payrollSection = () => {
    cy.visit(Cypress.env("URL_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.wait(199)
    cy.contains('li>button','Payroll').should('exist')
    cy.contains('li>button','Payroll').click({ force: true })
}

describe('Beta Vendor Admin | Employee | Payroll | logged with Admin credentials', () => {

    beforeEach(() => {
        cy.loginprod('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Production"), Cypress.env("Vendor_Receptionist_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it.only('Verify it is possible access to the payroll section- Admin credentials', () => {
        payrollSection()
        cy.contains('div>h6','Payrolls').should('exist')
    })

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