/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Calendar| Create New Appointment on the Calendar through Add New/New Appointment | logged with Admin Credentials', () => {

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

    it('Verify it is possible to acces New Appointment modal by clicking on Add New/New Appointment on the Calendar  - Admin credentials', () => {
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')  

    })

    it('Verify duration is required in the New Appointment form on the Calendar  - Admin credentials', () => {
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Duration must be at least 1min').should('be.visible')
    })

    it('Verify employee is required in the New Appointment form on the Calendar  - Admin credentials', () => {
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Duration must be at least 1min').should('be.visible')
    })
})