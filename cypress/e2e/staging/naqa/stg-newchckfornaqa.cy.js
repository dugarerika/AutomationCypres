/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })  
    
    beforeEach(() => {
        cy.login('Admin Session', Cypress.env("Vendor7_Admin_Username_Staging"), Cypress.env("Vendor7_Admin_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Subscriptions
    it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 999})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 999})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','10')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 999})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','10')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

        // Checkout successfully - Offers
    it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a offer ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.addPercentageDiscount('Down Payment Offer','40','10')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a offer ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.addFixedDiscount('Down Payment Offer','5','10')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // Checkout successfully - Downpayment Services
    it('Verify it is possible to complete a checkout successfully for 1 Donwpayment service', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Downpayment')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    // Checkout successfully - Normal Services
    it('Verify it is possible to complete a checkout successfully for 1 service', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40','10')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5','10')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it.only('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemGiftCard('243.48 KWD Gift Card')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Receptionist Session', Cypress.env("Vendor7_Receptionist_Username_Staging"), Cypress.env("Vendor7_Receptionist_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Services
    it('Verify it is possible to complete a checkout successfully for 1 service', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40','10')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5','10')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_Staging")
        cy.addItemGiftCard("243.48 KWD Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
})

// describe.only('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Staff Credentials', () => {

//     before(() => {
//         // ensure clean test slate for these tests
//         cy.then(Cypress.session.clearAllSavedSessions)
//     })
    
//     beforeEach(() => {
//         cy.login('Staff Session', Cypress.env("Vendor1_Staff_Username_Staging"), Cypress.env("Vendor1_Staff_Password_Staging"))
//     })

//     afterEach(() => {
//         cy.clearCookies()
//     })

//     // Checkout successfully - Services
//     it('Verify it is possible to complete a checkout successfully for 1 service', () => {
//         cy.newCheckout("URL_Staging")
//         cy.addItemService('Short Hair')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//     })
//     it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
//         cy.newCheckout("URL_Staging")
//         cy.addItemService('Hair Cut')
//         cy.addPercentageDiscount('Hair Cut','40')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//     })

//     it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
//         cy.newCheckout("URL_Staging")
//         cy.addItemService('Long Hair')
//         cy.addFixedDiscount('Long Hair','5')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//     })  

//     // checkout successfully - Giftcards
//     it('Verify it is possible to complete a checkout for Gift card', () => {
//         cy.newCheckout("URL_Staging")
//         cy.addItemGiftCard("243.48 KWD Gift Card")
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//     })

//     it('Verify after completing a checkout successfully it is possible to send the invoice thru email', () => {
//         cy.newCheckout("URL_Staging")
//         cy.addItemGiftCard("243.48 KWD Gift Card")
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('h3','Send Email').should('be.visible')
//     })
// })

// test cases pendingDuring the Appointment Checkout:

// Verify packages (Subscriptions) cannot be mixed with other items like products, services and offers ✅

// Verify it is possible to add new service after removing one leaving the cart empty. ✅

// Verify it is possible to add new product with a service already in the cart ✅

// Verify it is possible to add new subscription with a service and product already in the cart  ✅

// Verify that it is possible to remove a service after removing the applied coupon. ✅

// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅

// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅