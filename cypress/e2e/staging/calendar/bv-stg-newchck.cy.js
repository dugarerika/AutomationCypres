/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

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

    it('Verify it is not possible to complete New Checkout without adding item and payment - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout without adding payment - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout with the cart empty  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })
      
    it('Verify it is not possible to complete New Checkout for a service linking it to an employee  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
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
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })

    it('Verify it is not possible to complete New Checkout for a service linking it to an employee  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('button','Walk In').should('be.visible')
        cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        // cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('1')
        cy.fillButton('Cash')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Employee must be present')
        cy.wait(10)
    })

    it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the balance - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Debit')
    })

    it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the balance', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Credit')
    })

    it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the balance', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Cash')
    })

    it('Verify that After clicking the Fill button for Other, the Other text field is populated with the balance', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Other')
    })

    it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the balance', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Hisabe')
    })

    it('Verify the breakdown is correct after adding a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
    })

    it('Verify the breakdown is correct after applying a coupon to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
    })

    it('Verify the breakdown is correct after applying a fixed discount to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
    })

    it('Verify the breakdown is correct after applying a percentage discount to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
    })
})
