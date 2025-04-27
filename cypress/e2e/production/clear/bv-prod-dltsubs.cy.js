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


const accessToSubsSection = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    cy.contains('button>span','Subscriptions').should('exist')
    cy.contains('button>span','Subscriptions').click({ force: true })
    cy.contains('h6','Subscriptions').should('exist')
      cy.get('tbody>*').should('exist')
      cy.get('tbody>*').first().click({ force: true })
      cy.contains('h3', 'Update Subscription', { matchCase: false }).should('exist')
      cy.contains('button', 'Delete').should('exist')
      cy.contains('button', 'Delete').click({ force: true })
      cy.contains('p', 'Are you sure you want to delete this subscription?').should('exist')
      cy.contains('p', 'Are you sure you want to delete this subscription?').parents('section').next('div').find('button').eq(1).click({ force: true })
      cy.contains('span', 'Subscription deleted successfully').should('exist')
}

describe('Production - Beta Vendor Admin | Employee | Delete Subscription| logged with Admin credentials', () => {

    beforeEach(() => {
        cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

// Add Subscription form fiels validation

    it('Delete subscription', () => {
        accessToSubsSection()
        accessToSubsSection()
        accessToSubsSection()
        accessToSubsSection()
        accessToSubsSection()
    })
})






