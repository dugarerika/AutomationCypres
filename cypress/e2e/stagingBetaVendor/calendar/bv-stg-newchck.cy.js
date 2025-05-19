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

    // Required field during checkout
    it('Verify it is not possible to complete New Checkout without adding item and payment', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout without adding payment', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').trigger('click')
        cy.expectedMessageCompleteSale('Add at least one payment')
    })

    it('Verify it is not possible to complete New Checkout with the cart empty ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })

    it('Verify it is not possible to complete New Checkout for a service linking it to an employee ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').trigger('click')
        cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Add at least one payment')
        cy.wait(10)
    })

    it('Verify it is not possible to complete New Checkout for a service linking it to an employee ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        // cy.contains('div','Search customer..').should('be.visible')
        // cy.contains('button','Walk In').should('be.visible')
        // cy.contains('button','Walk In').click({force: true})
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
        cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
        cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
        cy.get('div[role="presentation"]').trigger('click')
        cy.fillButton('Cash')
        cy.wait(10)
        cy.expectedMessageCompleteSale('Employee must be present')
        cy.wait(10)
    })

    // Fillout buttons (it is pending gift card)
    it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct Total', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Debit')
    })

    it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct Total', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Credit')
    })

    it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct Total', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Cash')
    })

    it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct Total', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Other')
    })

    it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the correct Total', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.fillButton('Hisabe')
    })

    // Discounts
    it.skip('Verify the breakdown is correct after applying a coupon to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addCouponDiscount('long Hair','10')
    })

    it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','1')
    })

    it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','20')
    })

    it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','20')
    })

    it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addEmptyDiscount('Fixed')
    })

    it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addEmptyDiscount('Percentage')
    })

    it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.addEmptyDiscount('Coupon')
    })

    // Services checkout validations
    it('Verify the breakdown is correct after adding a service ', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('Hair Cut')
        cy.checkBreakdownNoDiscount('Hair Cut')   
    })

    it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.removeService('long Hair','Yes')
    })

    it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.removeService('long Hair','Cancel')
    })

    it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemService('long Hair')
        cy.removeService('long Hair','Yes')
        cy.addItemService('Hair Cut')
    })

    // Giftcards checkout validations
    it('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.addItemSubscription('Subscription B')
        cy.contains('span', 'Giftcards must be the only item in the cart').should('exist')
    })

    it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.addItemService('long Hair')
        cy.contains('span', 'Giftcards must be the only item in the cart').should('exist')
    })

    it('Verify Adjust button must be disable for Gift cards', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard('243.48 SAR Gift Card')
        cy.contains('button', 'Adjust').should('be.disabled')
    })

    it('Verify taxes are not changed on Gift cards', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.contains('h6', 'Tax 15%').should('not.exist')
    })

    // Subscriptions checkout validations
    it('Verify after having a Subscription in the cart it is not possible to add a Giftcard', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemSubscription('Subscription B')
        cy.addItemGiftCard("100 SAR Gift Card")
        cy.contains('span', 'Giftcards must be the only item in the cart').should('exist')
    })

    // Checkout successfully - Services
    it('Verify it is possible to complete a checkout successfully for 1 service', () => {
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
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','5')
        cy.fillButton('Cash')
        cy.addEmployee('ErikaT')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  

    // checkout successfully - Giftcards
    it('Verify it is possible to complete a checkout for Gift card', () => {
        cy.newCheckout("URL_BetaVendor_Staging")
        cy.addItemGiftCard('243.48 SAR Gift Card')
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
        cy.login('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Staging"), Cypress.env("Vendor_Receptionist_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    // Checkout successfully - Services
    it('Verify it is possible to complete a checkout successfully for 1 service', () => {
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
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','5')
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
        cy.addItemService('long Hair')
        cy.addFixedDiscount('long Hair','5')
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
})

// test cases pendingDuring the Appointment Checkout:

// Verify packages (Subscriptions) cannot be mixed with other items like products, services and offers ✅

// Verify it is possible to add new service after removing one leaving the cart empty. ✅

// Verify it is possible to add new product with a service already in the cart ✅

// Verify it is possible to add new subscription with a service and product already in the cart  ✅

// Verify that it is possible to remove a service after removing the applied coupon. ✅

// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅

// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅