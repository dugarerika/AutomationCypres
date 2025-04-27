/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Production - Beta Vendor Admin | Calendar| Create New Appointment on the Calendar through Add New/New Appointment | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is possible to acces New Appointment modal by clicking on Add New/New Appointment on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')  
    })

    it('Verify duration is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Duration must be at least 1min').should('be.visible')
    })

    it('Verify employee is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Employee is required').should('be.visible')
    })

    it('Verify service is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Some services are not available').should('be.visible')
    })

    it('Verify customer is not required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })
    
    it('Verify it is possible to create an appointment changing the date', () => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const dayNow = new Date().toLocaleDateString("en-US",options)
        cy.log(dayNow)
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Date').parent('div').find('input').click()
        cy.get(`[aria-label ="${dayNow}"]`).parent('button').next('button').click({force: true})
        cy.get('body').trigger('click')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('08:00 PM{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    it('Verify Start time for the offer is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('01:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Please Select Start Time for all Offer Services').should('be.visible')
    })

    it('Verify offer is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('01:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Some offers are not available').should('be.visible')
    })

    it('Verify it is possible to create a new appointment only for an offer', () => {
        cy.newAppt("URL_BetaVendor_Production")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('ALEX ALEX{downarrow}{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
        cy.contains('div>div>div>div','Service').parent('div').parent('div').parent('div').find('button').click({force: true})
        cy.contains('button','Create Appointment').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })
})