/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Admin Credentials', () => {

    // before(() => {
    //     // ensure clean test slate for these tests
    //     cy.then(Cypress.session.clearAllSavedSessions)
    // })  
    
    beforeEach(() => {
        cy.login('Admin Session', Cypress.env("Vendor1_Admin_Username_Staging"), Cypress.env("Vendor1_Admin_Password_Staging"))
        cy.visit(Cypress.env("URL_Staging") + 'admin/calendar')
    })

    afterEach(() => {
        cy.clearCookies()
    })

    describe('Validate required fields during new checkout:', () => {
        // Validate Required fields during checkout
        it('Verify it is not possible to complete New Checkout without adding item and payment', () => {
            cy.newCheckout("URL_Staging")
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout without adding payment', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout with the cart empty ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service without adding a payment and without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            // cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').trigger('click')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })  
    })

    describe('Fillout buttons (it is pending gift card) during the new checkout:', () => {
    // Fillout buttons (it is pending gift card)
        it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Debit')
        })

        it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Credit')
        })

        it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Cash')
        })

        it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Other')
        })

        it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Hisabe')
        })
    })

    describe('Discounts during the new checkout:', () => {
            // Discounts
        it('Verify the breakdown is correct after applying a coupon to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.wait(100)
            cy.addCouponDiscount('Hair Cut','CPN2','10', '15')
        })

        it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','1','15')
        })

        it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','20','15')
        })

        it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','20','15')
        })

        it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Fixed')
        })

        it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Percentage')
        })

        it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Coupon')
        })
    })

    describe('Services checkout validations during the new checkout:', () => {
    // Services checkout validations
        it('Verify the breakdown is correct after adding a normal service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.checkBreakdownNoDiscount('Hair Cut','15')   
        })

        it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
        })

        it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Cancel')
        })

        it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemService('Hair Cut')
        })
    })

    describe('Product checkout validations during the new checkout:', () => {
        // Checkout successfully - Products
        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Change customer').click()
            cy.contains('div','Search customer..').should('be.visible')
            cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
            cy.wait(100)
            cy.addItemProduct('Blond studio 9')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })

        it('Verify it is possible to add new product after removing one service leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemProduct('Blond studio 9')
        })

        it('Verify that it is possible to remove a product from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Yes')
        })

        it('Verify that it is not possible to remove a product from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Cancel')
        })
    })

    describe('Giftcards checkout validations during new checkout:', () => {
    // Giftcards checkout validations
        it('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemService('Long Hair')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a product', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add an offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify Adjust button must be disable for Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.contains('button', 'Adjust').should('be.disabled')
        })

        it('Verify taxes are not changed on Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('h6', 'Tax 15%').should('not.exist')
        })

    })

    describe('Subscriptions checkout validations during the new checkout:', () => {
    // Subscriptions checkout validations
        it('Verify after having a Subscription added first in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify after having a (Subscription added after any other item) in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemService('Long Hair')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })    
    })

    describe('Checkout successfully for Subscription thru the new checkout:', () => {
        // Checkout successfully - Subscriptions
    it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  
    })

    describe('Checkout successfully for Offers thru the new checkout:', () => {
        // Checkout successfully - Offers
        it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addPercentageDiscount('Down Payment Offer','40','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addFixedDiscount('Down Payment Offer','5','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('Checkout successfully for Downpayment Services thru the new checkout:', () => {
        it('Verify it is possible to complete a checkout successfully for 1 Donwpayment service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Downpayment')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    }) 

    describe('Checkout successfully for Normal Services thru the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Short Hair')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','5','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('checkout successfully for Gift card thru the new checkout:', () => {
        it('Verify it is possible to complete a checkout for Gift card', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    })

    describe('Checkout successfully for Products thru the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 Products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a 1 Product ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addPercentageDiscount('Blond studio 9','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a Products ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addFixedDiscount('Blond studio 9','0.5','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe.skip('Checkout successfully for a Mix of Services and Products thru the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 Products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addEmployee('ErikaT')
            cy.addItemService('Short Hair')
            cy.addEmployee('ErikaT')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a 1 Product ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addPercentageDiscount('Blond studio 9','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a Products ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addFixedDiscount('Blond studio 9','0.5','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Receptionist Credentials', () => {

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

    describe('Validate required fields during new checkout:', () => {
        // Validate Required fields during checkout
        it('Verify it is not possible to complete New Checkout without adding item and payment', () => {
            cy.newCheckout("URL_Staging")
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout without adding payment', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout with the cart empty ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.fillButton('Cash')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Employee must be present')
            cy.wait(10)
        })  
    })

    describe('Fillout buttons (it is pending gift card) during the new checkout:', () => {
    // Fillout buttons (it is pending gift card)
        it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Debit')
        })

        it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Credit')
        })

        it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Cash')
        })

        it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Other')
        })

        it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Hisabe')
        })
    })

    describe('Discounts during the new checkout:', () => {
            // Discounts
        it('Verify the breakdown is correct after applying a coupon to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.wait(100)
            cy.addCouponDiscount('Hair Cut','CPN2','10', '15')
        })

        it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','1','15')
        })

        it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','20','15')
        })

        it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','20','15')
        })

        it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Fixed')
        })

        it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Percentage')
        })

        it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Coupon')
        })
    })

    describe('Services checkout validations during the new checkout:', () => {
    // Services checkout validations
        it('Verify the breakdown is correct after adding a normal service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.checkBreakdownNoDiscount('Hair Cut','15')   
        })

        it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
        })

        it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Cancel')
        })

        it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemService('Hair Cut')
        })
    })

    describe('Product checkout validations during the new checkout:', () => {
        // Checkout successfully - Products
        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Change customer').click()
            cy.contains('div','Search customer..').should('be.visible')
            cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
            cy.wait(100)
            cy.addItemProduct('Blond studio 9')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })

        it('Verify it is possible to add new product after removing one service leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemProduct('Blond studio 9')
        })

        it('Verify that it is possible to remove a product from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Yes')
        })

        it('Verify that it is not possible to remove a product from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Cancel')
        })
    })
    
    describe('Giftcards checkout validations during new checkout:', () => {
    // Giftcards checkout validations
        it('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemService('Long Hair')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a product', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add an offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify Adjust button must be disable for Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.contains('button', 'Adjust').should('be.disabled')
        })

        it('Verify taxes are not changed on Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('h6', 'Tax 15%').should('not.exist')
        })

    })

    describe('Subscriptions checkout validations during the new checkout:', () => {
    // Subscriptions checkout validations
        it('Verify after having a Subscription added first in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify after having a (Subscription added after any other item) in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemService('Long Hair')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })    
    })

    describe('Checkout successfully for Subscription during the new checkout:', () => {
        // Checkout successfully - Subscriptions
    it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  
    })

    describe('Checkout successfully for Offers during the new checkout:', () => {
        // Checkout successfully - Offers
        it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addPercentageDiscount('Down Payment Offer','40','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addFixedDiscount('Down Payment Offer','5','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('Checkout successfully for Downpayment Services during the new checkout:', () => {
        it('Verify it is possible to complete a checkout successfully for 1 Donwpayment service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Downpayment')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    }) 

    describe('Checkout successfully for Normal Services during the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Short Hair')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','5','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('checkout successfully for Giftcards during the new checkout:', () => {
        it('Verify it is possible to complete a checkout for Gift card', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    })
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with Staff Credentials', () => {

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

        describe('Validate required fields during new checkout:', () => {
        // Validate Required fields during checkout
        it('Verify it is not possible to complete New Checkout without adding item and payment', () => {
            cy.newCheckout("URL_Staging")
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout without adding payment', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout with the cart empty ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.fillButton('Cash')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Employee must be present')
            cy.wait(10)
        })  
    })

    describe('Fillout buttons (it is pending gift card) during the new checkout:', () => {
    // Fillout buttons (it is pending gift card)
        it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Debit')
        })

        it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Credit')
        })

        it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Cash')
        })

        it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Other')
        })

        it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Hisabe')
        })
    })

    describe('Discounts during the new checkout:', () => {
            // Discounts
        it('Verify the breakdown is correct after applying a coupon to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.wait(100)
            cy.addCouponDiscount('Hair Cut','CPN2','10', '15')
        })

        it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','1','15')
        })

        it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','20','15')
        })

        it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','20','15')
        })

        it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Fixed')
        })

        it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Percentage')
        })

        it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Coupon')
        })
    })

    describe('Services checkout validations during the new checkout:', () => {
    // Services checkout validations
        it('Verify the breakdown is correct after adding a normal service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.checkBreakdownNoDiscount('Hair Cut','15')   
        })

        it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
        })

        it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Cancel')
        })

        it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemService('Hair Cut')
        })
    })

    describe('Product checkout validations during the new checkout:', () => {
        // Checkout successfully - Products
        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Change customer').click()
            cy.contains('div','Search customer..').should('be.visible')
            cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
            cy.wait(100)
            cy.addItemProduct('Blond studio 9')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })

        it('Verify it is possible to add new product after removing one service leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemProduct('Blond studio 9')
        })

        it('Verify that it is possible to remove a product from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Yes')
        })

        it('Verify that it is not possible to remove a product from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Cancel')
        })
    })
    
    describe('Giftcards checkout validations during new checkout:', () => {
    // Giftcards checkout validations
        it('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemService('Long Hair')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a product', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add an offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify Adjust button must be disable for Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.contains('button', 'Adjust').should('be.disabled')
        })

        it('Verify taxes are not changed on Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('h6', 'Tax 15%').should('not.exist')
        })

    })

    describe('Subscriptions checkout validations during the new checkout:', () => {
    // Subscriptions checkout validations
        it('Verify after having a Subscription added first in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify after having a (Subscription added after any other item) in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemService('Long Hair')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })    
    })

    describe('Checkout successfully for Subscription during the new checkout:', () => {
        // Checkout successfully - Subscriptions
    it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  
    })

    describe('Checkout successfully for Offers during the new checkout:', () => {
        // Checkout successfully - Offers
        it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addPercentageDiscount('Down Payment Offer','40','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addFixedDiscount('Down Payment Offer','5','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('Checkout successfully for Downpayment Services during the new checkout:', () => {
        it('Verify it is possible to complete a checkout successfully for 1 Donwpayment service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Downpayment')
            cy.fillButton('Cash')
            cy.addEmployee('Zumba Zumba')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    }) 

    describe('Checkout successfully for Normal Services during the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Short Hair')
            cy.fillButton('Cash')
            cy.addEmployee('Zumba Zumba')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('Zumba Zumba')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','5','15')
            cy.fillButton('Cash')
            cy.addEmployee('Zumba Zumba')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('checkout successfully for Giftcards during the new checkout:', () => {
        it('Verify it is possible to complete a checkout for Gift card', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    })
})

describe('Staging - Beta Vendor Admin | Calendar| New Checkout | logged with low permission level credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })  
    
    beforeEach(() => {
        cy.login('Admin Session', Cypress.env("Vendor1_Low_Level_Username_Staging"), Cypress.env("Vendor1_Low_Level_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    describe('Validate required fields during new checkout:', () => {
        // Validate Required fields during checkout
        it('Verify it is not possible to complete New Checkout without adding item and payment', () => {
            cy.newCheckout("URL_Staging")
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout without adding payment', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout with the cart empty ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.wait(10)
            cy.expectedMessageCompleteSale('Add at least one payment')
            cy.wait(10)
        })

        it('Verify it is not possible to complete New Checkout for a service without adding a payment and without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').filter(':visible').first().trigger('click', {force: true})
            // cy.contains('h5', 'Amount to pay').parent('div').next('div').find('input').eq(0).type('0')
            cy.expectedMessageCompleteSale('Add at least one payment')
        })

        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Add New').should('be.visible')
            cy.contains('button','Add New').click({force: true})
            cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
            cy.contains('label>span', 'search').parents('label').next('div').find('input').type('Hair Cut')
            cy.contains('div', 'Hair Cut').parents('li').find('button').click({force: true})
            cy.get('div[role="presentation"]').trigger('click')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })  
    })

    describe('Fillout buttons (it is pending gift card) during the new checkout:', () => {
    // Fillout buttons (it is pending gift card)
        it('Verify that After clicking the Fill button for Debit, the Debit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Debit')
        })

        it('Verify that After clicking the Fill button for Credit, the Credit text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Credit')
        })

        it('Verify that After clicking the Fill button for Cash, the Cash text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Cash')
        })

        it('Verify that After clicking the Fill button for Other, the Other text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Other')
        })

        it('Verify that After clicking the Fill button for Hisabe, the Hisabe text field is populated with the correct Total', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.fillButton('Hisabe')
        })
    })

    describe('Discounts during the new checkout:', () => {
            // Discounts
        it('Verify the breakdown is correct after applying a coupon to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.wait(100)
            cy.addCouponDiscount('Hair Cut','CPN2','10', '15')
        })

        it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','1','15')
        })

        it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','20','15')
        })

        it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','20','15')
        })

        it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Fixed')
        })

        it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Percentage')
        })

        it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addEmptyDiscount('Coupon')
        })
    })

    describe('Services checkout validations during the new checkout:', () => {
    // Services checkout validations
        it('Verify the breakdown is correct after adding a normal service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.checkBreakdownNoDiscount('Hair Cut','15')   
        })

        it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')  
            cy.removeItem('Long Hair','Yes')
        })

        it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Cancel')
        })

        it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemService('Hair Cut')
        })
    })

    describe('Product checkout validations during the new checkout:', () => {
        // Checkout successfully - Products
        it('Verify it is not possible to complete New Checkout for a service without linking it to an employee ', () => {
            cy.newCheckout("URL_Staging")
            cy.contains('button','Change customer').click()
            cy.contains('div','Search customer..').should('be.visible')
            cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
            cy.wait(100)
            cy.addItemProduct('Blond studio 9')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Employee must be present')
        })

        it('Verify it is possible to add new product after removing one service leaving the cart empty', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.removeItem('Long Hair','Yes')
            cy.addItemProduct('Blond studio 9')
        })

        it('Verify that it is possible to remove a product from the cart after confirming do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Yes')
        })

        it('Verify that it is not possible to remove a product from the cart after canceling do you want to delete it', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.removeItem('Blond studio 9','Cancel')
        })
    })

    describe('Giftcards checkout validations during new checkout:', () => {
    // Giftcards checkout validations
        it('Verify the Gift card must be the only item in the cart trying to add a subscription', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemService('Long Hair')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add a product', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify the Gift card must be the only item in the cart trying to add an offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify Adjust button must be disable for Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.contains('button', 'Adjust').should('be.disabled')
        })

        it('Verify taxes are not changed on Gift cards', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('h6', 'Tax 15%').should('not.exist')
        })

    })

    describe('Subscriptions checkout validations during the new checkout:', () => {
    // Subscriptions checkout validations
        it('Verify after having a Subscription added first in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify after having a (Subscription added after any other item) in the cart it is not possible to add a Giftcard', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard("100 SAR Gift Card")
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Giftcards must be the only item in the cart').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemService('Long Hair')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like services', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemOffer('Down Payment Offer')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like offers', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })

        it('Verify packages (Subscriptions added first) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemSubscription('Subscription B')
            cy.addItemProduct('Blond studio 9')
            cy.contains('span', 'This item type cannot be mixed with subscriptions.').should('be.visible')
        })

        it('Verify packages (Subscriptions added after any other item) cannot be mixed with other items like products', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemProduct('Blond studio 9')
            cy.addItemSubscription('Subscription B')
            cy.contains('span', 'Subscriptions cannot be combined with other items in the same checkout.').should('be.visible')
        })    
    })

    describe('Checkout successfully for Subscription during the new checkout:', () => {
        // Checkout successfully - Subscriptions
    it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })
    it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })

    it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
        cy.newCheckout("URL_Staging")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Dugar Erika{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
    })  
    })

    describe('Checkout successfully for Offers during the new checkout:', () => {
        // Checkout successfully - Offers
        it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addPercentageDiscount('Down Payment Offer','40','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a offer ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemOffer('Down Payment Offer')
            cy.addFixedDiscount('Down Payment Offer','5','15')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('Checkout successfully for Downpayment Services during the new checkout:', () => {
        it('Verify it is possible to complete a checkout successfully for 1 Donwpayment service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Downpayment')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    }) 

    describe('Checkout successfully for Normal Services during the new checkout:', () => {   
        it('Verify it is possible to complete a checkout successfully for 1 service', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Short Hair')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a percentage discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Hair Cut')
            cy.addPercentageDiscount('Hair Cut','40','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })

        it('Verify it is possible to complete a checkout successfully after applying a fix discount to a service ', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemService('Long Hair')
            cy.addFixedDiscount('Long Hair','5','15')
            cy.fillButton('Cash')
            cy.addEmployee('ErikaT')
            cy.expectedMessageCompleteSale('Sale Completed')
        })  
    })

    describe('checkout successfully for Giftcards during the new checkout:', () => {
        it('Verify it is possible to complete a checkout for Gift card', () => {
            cy.newCheckout("URL_Staging")
            cy.addItemGiftCard('243.48 SAR Gift Card')
            cy.fillButton('Cash')
            cy.expectedMessageCompleteSale('Sale Completed')
        })
    })
})

// test cases pendingDuring the Appointment Checkout:
// Verify it is possible to add new product with a service already in the cart ✅
// Verify it is possible to add new subscription with a service and product already in the cart  ✅
// Verify that it is possible to remove a service after removing the applied coupon. ✅
// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅
// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅