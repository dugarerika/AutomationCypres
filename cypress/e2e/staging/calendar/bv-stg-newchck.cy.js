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
describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Admin Credentials', () => {

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

    it.skip('Verify it is not possible to complete New Checkout without adding item and payment - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.wait(10)
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })

    it.skip('Verify it is not possible to complete New Checkout without adding payment - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.wait(1)
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
  
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })

    it.skip('Verify it is not possible to complete New Checkout with the cart empty  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Cart not found')
        cy.wait(10)
    })
      
    it.skip('Verify it is not possible to complete New Checkout for a service linking it to an employee  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Employee must be present')
        cy.wait(10)
    })

    it.only('Verify fill button for Debit card is working  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.contains('label', 'Debit').parent('div').parent('div').next('div').find('button').click({force: true})
        cy.contains('label', 'Debit').find('input')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Employee must be present')
        cy.wait(10)
    })

    it('Verify it is not possible to complete New Checkout with the cart empty  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.wait(10)
        // cy.contains('button','Complete Sale').should('be.visible')
        // cy.contains('button','Complete Sale').click({force: true})
        cy.expectedMessageCompleteSale('Choose a customer or walk-in')
        cy.wait(10)
        // cy.contains('button','Submit').click({force: true})
        // cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it('Verify it is not possible to complete New Checkout with the cart empty  - Admin credentials', () => {
        newCheckout()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.wait(10)
        // cy.contains('button','Complete Sale').should('be.visible')
        // cy.contains('button','Complete Sale').click({force: true})
        cy.expectedMessageCompleteSale('Choose a customer or walk-in')
        cy.wait(10)
        // cy.contains('button','Submit').click({force: true})
        // cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })
})
