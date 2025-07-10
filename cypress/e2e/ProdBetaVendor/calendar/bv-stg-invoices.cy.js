/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Calendar| Invoices generate from New Checkout | logged with Admin Credentials', () => {

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

    // Required 
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Staging"), Cypress.env("Vendor_Receptionist_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Staff Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Staff Session', Cypress.env("Vendor_Staff_Username_Staging"), Cypress.env("Vendor_Staff_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Services Invoices
    it('Verify the invoice after completing checkout successfully 1 service without discount', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify the invoice after completing checkout successfully 1 service with a percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify the invoice after completing checkout successfully 1 service with a fix discount', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','5')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards Invoices

    it.only('Verify after completing a checkout successfully it is possible to send the invoice thru email', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("243.48 SAR Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
    })
})

// test cases pendingDuring the Appointment Checkout:

// Verify packages (Subscriptions) cannot be mixed with other items like products, services and offers ✅

// Verify it is possible to add new service after removing one leaving the cart empty. ✅

// Verify it is possible to add new product with a service already in the cart ✅

// Verify it is possible to add new subscription with a service and product already in the cart  ✅

// Verify that it is possible to remove a service after removing the applied coupon. ✅

// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅

// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅