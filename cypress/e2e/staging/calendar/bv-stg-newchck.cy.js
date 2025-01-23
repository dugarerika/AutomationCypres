/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const newCheckout = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(1000)
    cy.contains('li','New Checkout').should('be.visible')
    cy.contains('li','New Checkout').click({force: true})
}
describe('Staging - Beta Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Admin Session', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it.only('Checkout a service  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        //cy.get('div[data-dashlane-classification="login,step,final"]').find('ul>li').first().find('button').click({force: true})
        cy.wait(100000)
        // cy.contains('button','Submit').click({force: true})
        // cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it('Checkout a product  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(1).click({force: true})
        // cy.contains('button','Submit').click({force: true})
        // cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })
})
