/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const employeeWorkingHoursSection = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('li>button','Working Hours').should('exist')
    cy.contains('li>button','Working Hours').click({ force: true })
}

describe('Beta Vendor Admin | Employee | Create Employee| logged with Admin credentials', () => {

    beforeEach(() => {
        cy.login('Admin Section', Cypress.env("Vendor0_Admin_Username_Staging"), Cypress.env("Vendor0_Admin_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is possible access to the Working hours section- Admin credentials', () => {
        employeeWorkingHoursSection()
    })

// Add Employee Successfully
// LOW Permission Level
    it('Verify it is possible to add an Employee with role Readonly by filling up All the required info, selecting all services and adding ', () => {
        employeeWorkingHoursSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('Low')
        cy.selectAllServices()
        cy.expectedMessageCreateEmployee('Employee created')
    })
})