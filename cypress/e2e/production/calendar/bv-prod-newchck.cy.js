/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Production - Beta Vendor Admin | Calendar| New Checkout | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.loginprod('Admin Session', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is not possible to complete New Checkout without adding item and payment - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout without adding payment - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout with the cart empty  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })
      
    it('Verify it is not possible to complete New Checkout for a service linking it to an employee  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
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
        cy.newCheckout("URL_BetaVendor_Production")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
        cy.fillButton('Cash')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Employee must be present')
        cy.wait(10)
    })

    it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct balance - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.fillButton('Debit')
    })

    it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct balance - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.fillButton('Credit')
    })

    it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct balance - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.fillButton('Cash')
    })

    it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct balance - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.fillButton('Other')
    })

    it('Verify the breakdown is correct after adding a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.checkBreakdownNoDiscount('Hair Cut')
        
    })

    it.skip('Verify the breakdown is correct after applying a coupon to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.addCouponDiscount('Long Hair','10')
    })

    it('Verify the breakdown is correct after applying a fixed discount to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','1')
    })

    it('Verify the breakdown is correct after applying a percentage discount to a service  - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','20')
    })

    it('Verify it is not possible to apply a fixed discount greather than the service price - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','20')
    })

    it('Verify it is not possible to apply a fixed discount when leaving the discount empty - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Fixed')
    })

    it('Verify it is not possible to apply a Percentage discount when leaving the discount empty - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Percentage')
    })

    it('Verify it is not possible to apply a Coupon discount when leaving the discount empty - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Coupon')
    })

    it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Yes')
    })

    it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Cancel')
    })

    it('Verify it is possible to add new service after removing one leaving the cart empty - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Yes')
        cy.addItemService('Hair Cut')
    })

    it.skip('Verify the Gift card must be the only item in the cart - Admin credentials', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Coupon')
    })
})


// During the Appointment Checkout:

// Verify the the Gift card must be the only item in the cart ✅

// Verify packages (Subscriptions) cannot be mixed with other items like products, services and offers ✅

// Verify it is possible to add new service after removing one leaving the cart empty. ✅

// Verify it is possible to add new product with a service already in the cart ✅

// Verify it is possible to add new subscription with a service and product already in the cart  ✅

// Verify that it is possible to remove a service after removing the applied coupon. ✅

// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅

// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅