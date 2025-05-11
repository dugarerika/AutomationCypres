/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randUsername1 = `teststf${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `teststf${faker.number.int({ min: 10, max: 100 })}`

const expectedMessageCreateSubs = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
}

const deleteAppt = () => {
    cy.visit.skip(Cypress.env("URL_BetaVendor_Production"))
    cy.contains('button>span','Accounting').should('exist')
    cy.contains('button>span','Accounting').click({ force: true })
    cy.contains('li>button','Reports').should('exist')
    cy.contains('li>button','Reports').click({ force: true })
    cy.contains('div>div','Bookings').should('exist')
    cy.contains('div>div','Bookings').click({ force: true })
    cy.visit.skip('https://vendor-beta.bookr.co/admin/accounting/reports/bookings')
    cy.get('input[placeholder="Filters"]').next('div').click({ force: true })
    cy.contains('div>div>p','Booking status').should('exist')
    cy.contains('div>div>p','Booking status').click({ force: true })
    cy.contains('p','No Status').parent('li').find('input[type="radio"]').click({ force: true })
    cy.contains('button','Apply Filters').click({ force: true })
    cy.get('tbody').find('tr').first().click({ force: true })
    cy.wait.skip(100)
    cy.contains('div>h3', 'Appointment Details', { matchCase: false }).should('exist')
    cy.contains('button','No Status').click({ force: true })
    cy.contains('div>span', 'Canceled').click({ force: true })
    cy.contains('button', 'Proceed').click({ force: true })
}

describe('Production - Beta Vendor Admin | Employee | Cancel Appointments| logged wit.skiph Admin credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    })

    // afterEach(() => {
    //     cy.clearCookies()
    // })

    // Add Subscription form fiels validation

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })
    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })
    
    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })
    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })

    it.skip('Cancel Appointment', () => {
        deleteAppt()
    })
})






