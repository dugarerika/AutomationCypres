/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const newCheckout = () => {
    cy.visit(Cypress.env("URL_OldVendor_Staging"))
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(1000)
    cy.contains('li','New Checkout').should('be.visible')
    cy.contains('li','New Checkout').click({force: true})
    // cy.contains('div>h3','Create Blocked Time').should('be.visible')
    // cy.contains('div>h3','Create Blocked Time').click({force: true})
  }
describe('Staging - Old Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })

    beforeEach(() => {
        cy.loginov('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Checkout a service  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
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