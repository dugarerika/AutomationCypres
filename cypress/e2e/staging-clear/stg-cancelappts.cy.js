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
    cy.visit(Cypress.expose("URL_Staging"))
    cy.contains('button>span','Accounting').should('exist')
    cy.contains('button>span','Accounting').click({ force: true })
    cy.contains('li>button', /^Reports$/).should('exist')
    cy.contains('li>button', /^Reports$/).click({ force: true })
    cy.contains('div>div','Sales and Bookings').should('exist')
    cy.contains('div>div','Sales and Bookings').click({ force: true })
    cy.visit('https://vendor.bookr-dev.com/admin/accounting/reports/invoices')
    cy.contains('label', /^Type$/).parent().find('input[role="combobox"]').click().type('{enter}')
    cy.wait(100)
    cy.get('[role="row"][row-index="0"] [role="gridcell"][col-id="invoiceNo"]').click()
    cy.wait(900)
    cy.wait(8)
    cy.contains('div>h3', 'Details', { matchCase: false }).should('exist')
    cy.contains('button','No Status').click({ force: true })
    cy.contains('div>span', 'Canceled').click({ force: true })
    cy.contains('button', 'Proceed').click({ force: true })
}

describe('Staging - Beta Vendor Admin | ARTNAILCORNER | Cancel Appointments| logged with Admin credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Admin Section', Cypress.expose("Vendor_Admin_Username_Staging"), Cypress.expose("Vendor_Admin_Password_Staging"))
                cy.visit(Cypress.expose("URL_Staging") + 'admin/calendar')
        cy.wait(64)
        // cy.contains('h3','Welcome Back!').next('button').click()
        cy.get('body').then(($body) => {
            if ($body.text().includes('Welcome Back!')) {
                cy.contains('h3', 'Welcome Back!').next('button').click()
                cy.wait(64)
            }
        })
        cy.wait(64)

    })

    // afterEach(() => {
    //     cy.clearCookies()
    // })

    // Add Subscription form fiels validation

    it('Cancel Appointment', () => {
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
})

describe('Staging - Beta Vendor Admin | COCOCUTSALON | Cancel Appointments| logged with Admin credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Admin Section', Cypress.expose("Vendor1_Admin_Username_Staging"), Cypress.expose("Vendor1_Admin_Password_Staging"))
                cy.visit(Cypress.expose("URL_Staging") + 'admin/calendar')
        cy.wait(64)
        // cy.contains('h3','Welcome Back!').next('button').click()
        cy.get('body').then(($body) => {
            if ($body.text().includes('Welcome Back!')) {
                cy.contains('h3', 'Welcome Back!').next('button').click()
                cy.wait(64)
            }
        })
        cy.wait(64)

    })

    // afterEach(() => {
    //     cy.clearCookies()
    // })

    // Add Subscription form fiels validation

    it('Cancel Appointment', () => {
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
})

describe('Staging - Beta Vendor Admin | PINKDOOR | Cancel Appointments| logged with Admin credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Admin Section', Cypress.expose("Vendor6_Admin_Username_Staging"), Cypress.expose("Vendor6_Admin_Password_Staging"))
                cy.visit(Cypress.expose("URL_Staging") + 'admin/calendar')
        cy.wait(64)
        // cy.contains('h3','Welcome Back!').next('button').click()
        cy.get('body').then(($body) => {
            if ($body.text().includes('Welcome Back!')) {
                cy.contains('h3', 'Welcome Back!').next('button').click()
                cy.wait(64)
            }
        })
        cy.wait(64)

    })

    // afterEach(() => {
    //     cy.clearCookies()
    // })

    // Add Subscription form fiels validation

    it('Cancel Appointment', () => {
        deleteAppt()
        deleteAppt()
    })

    it('Cancel Appointment', () => {

    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

        it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
    
    it('Cancel Appointment', () => {
        deleteAppt()
    })

    it('Cancel Appointment', () => {
        deleteAppt()
    })
})






