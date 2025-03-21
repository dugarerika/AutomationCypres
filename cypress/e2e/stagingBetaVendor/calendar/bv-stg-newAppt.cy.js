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
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Employee is required').should('be.visible')
    })

    it('Verify service is required in the New Appointment form on the Calendar  - Admin credentials', () => {
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Helen{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Some services are not available').should('be.visible')
    })

    it('Verify customer is not required in the New Appointment form on the Calendar  - Admin credentials', () => {
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Helen{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    
    it('Verify it is possible to create an appointment changing the date - Admin credentials', () => {
        const options = {
            day: "numeric",
        };
        const dayNow = eval(new Date().toLocaleDateString("en-US",options)) + 1
        cy.log(dayNow)
        cy.newAppt("URL_BetaVendor_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Helen{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Date').parent('div').find('input').click()
        cy.get('.react-calendar__month-view__days').contains('button>abbr',dayNow).click()
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })
})