/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe.only('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })  
    
    beforeEach(() => {
        cy.login('Admin Session', Cypress.env("Vendor1_Admin_Username_Staging"), Cypress.env("Vendor1_Admin_Password_Staging"))
        cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
        // cy.createappt('Susan one','01:00', 'Downpayment')
        // cy.createappt('Helen','01:00', 'Downpayment')
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Required field during checkout
    it('Verify it is not possible to complete Appointment Checkout without adding payment', () => {
        cy.createappt('Susan one','01:00', 'Downpayment')
        cy.searchAppt('Susan one')
        cy.contains('button','Checkout').click()
        cy.wait(999)
        cy.contains('Change customer').should('be.visible')
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    // Fillout buttons with Downpayment (it is pending gift card)
    it('Verify that clicking "Fill" for Debit sets the field with the paid Downpayment amount for a Downpayment service.', () => {
        cy.createappt('Helen','01:00', 'Downpayment')
        cy.searchAppt('Helen')
        cy.contains('button','Checkout').click()
        cy.fillButtonDonwpayment('Debit')
        cy.wait(99)
    })

    it('Verify that clicking "Fill" for Credit sets the field with the paid Downpayment amount for a Downpayment service.', () => {
        // cy.createappt('Helen','01:00', 'Downpayment')
        cy.searchAppt('Helen')
        cy.contains('button','Checkout').click()
        cy.fillButtonDonwpayment('Credit')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Cash sets the field with the paid Downpayment amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.fillButtonDonwpayment('Cash')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Other sets the field with the paid Downpayment amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.fillButtonDonwpayment('Other')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Hisabe sets the field with the paid Downpayment amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.fillButtonDonwpayment('Hisabe')
    cy.wait(999)
    })

    // Fillout buttons with Total (it is pending gift card)
    it('Verify that clicking "Fill" for Debit sets the field with the paid Total amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.disableDownpaymentSwitch()
    cy.fillButton('Debit')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Credit sets the field with the paid Total amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.disableDownpaymentSwitch()
    cy.fillButton('Credit')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Cash sets the field with the paid Total amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.disableDownpaymentSwitch()
    cy.fillButton('Cash')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Other sets the field with the paid Total amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.disableDownpaymentSwitch()
    cy.fillButton('Other')
    cy.wait(999)
    })

    it('Verify that clicking "Fill" for Hisabe sets the field with the paid Total amount for a Downpayment service.', () => {
    // cy.createappt('Helen','01:00', 'Downpayment')
    cy.searchAppt('Helen')
    cy.contains('button','Checkout').click()
    cy.disableDownpaymentSwitch()
    cy.fillButton('Hisabe')
    cy.wait(999)
    })

    // Discounts
    it.skip('Verify the breakdown is correct after applying a coupon to a service ', () => {
    cy.newCheckout("URL_BetaVendor_Staging")
    cy.addItemService('Hair Cut')
    cy.addCouponDiscount('Long Hair','10')
    })

    it.skip('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
    cy.newCheckout("URL_BetaVendor_Staging")
    cy.addItemService('Long Hair')
    cy.addFixedDiscount('Long Hair','1')
    })

    it.skip('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
    cy.newCheckout("URL_BetaVendor_Staging")
    cy.addItemService('Hair Cut')
    cy.addPercentageDiscount('Hair Cut','20')
    })

    it.skip('Verify it is not possible to apply a fixed discount greather than the service price', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','20')
    })

    it.skip('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Fixed')
    })

    it.skip('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Percentage')
    })

    it.skip('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addEmptyDiscount('Coupon')
    })

    // Services checkout validations
    it.skip('Verify the breakdown is correct after adding a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.checkBreakdownNoDiscount('Hair Cut')   
    })

    it.skip('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Yes')
    })

    it.skip('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Cancel')
    })

    it.skip('Verify it is possible to add new service after removing one leaving the cart empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.removeService('Long Hair','Yes')
        cy.addItemService('Hair Cut')
    })

    // Giftcards checkout validations
    it.skip('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.addItemSubscription('Subscription B')
        cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
    })

    it.skip('Verify the Gift card must be the only item in the cart trying to add a service', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.addItemService('Long Hair')
        cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
    })

    it.skip('Verify Adjust button must be disable for Gift cards', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard('243.48 SAR Gift Card')
        cy.contains('button', 'Adjust').should('be.disabled')
    })

    it.skip('Verify taxes are not changed on Gift cards', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.contains('h6', 'Tax 15%').should('not.exist')
    })

    // Subscriptions checkout validations
    it.skip('Verify after having a Subscription in the cart it is not possible to add a Giftcard', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemSubscription('Subscription B')
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
    })

    // Checkout successfully - Subscriptions
    it.skip('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it.skip('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it.skip('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

        // Checkout successfully - Offers
    it.skip('Verify it is possible to complete a checkout successfully for 1 offer', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it.skip('Verify it is possible to complete a checkout after applying a percentage discount to a offer ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.addPercentageDiscount('Down Payment Offer','40')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it.skip('Verify it is possible to complete a checkout after applying a fix discount to a offer ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemOffer('Down Payment Offer')
        cy.addFixedDiscount('Down Payment Offer','5')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // Checkout successfully - Services
    it.skip('Verify it is possible to complete a checkout successfully for 1 service', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it.skip('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it.skip('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it.skip('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard('243.48 SAR Gift Card')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
})

describe.skip('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Receptionist Session', Cypress.env("Vendor1_Receptionist_Username_Staging"), Cypress.env("Vendor1_Receptionist_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Services
    it.skip('Verify it is possible to complete a checkout successfully for 1 service', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("243.48 SAR Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
})

describe.skip('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Staff Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.login('Staff Session', Cypress.env("Vendor1_Staff_Username_Staging"), Cypress.env("Vendor1_Staff_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Services
    it('Verify it is possible to complete a checkout successfully for 1 service', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("243.48 SAR Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify after completing a checkout successfully it is possible to send the invoice thru email', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("243.48 SAR Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('h3','Send Email').should('be.visible')
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