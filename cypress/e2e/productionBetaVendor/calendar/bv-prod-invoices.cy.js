/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Production - Beta Vendor Admin | Calendar| Invoices generate from New Checkout | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })  
    
    beforeEach(() => {
        cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    
    })

    afterEach(() => {
        cy.clearCookies()
    })

        // Checkout successfully - Subscriptions
    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with fixed discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

        // Checkout successfully - Offers
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 Offer without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.addPercentageDiscount('Down Payment Offer','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with fixed discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.addFixedDiscount('Down Payment Offer','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

    // Checkout successfully - Services Invoices
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40','15')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a fix discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5','15')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

    // checkout successfully - Giftcards Invoices

    it(' Verify that the invoice is successfully sent by email - Walkin - GiftCard', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemGiftCard("243.48 KWD Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
})

describe('Production - Beta Vendor Admin | Calendar| New Checkout | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.loginprod('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Production"), Cypress.env("Vendor_Receptionist_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

        // Checkout successfully - Subscriptions
    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addPercentageDiscount('Subscription B','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with fixed discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.contains('button','Change customer').click()
        cy.contains('div','Search customer..').should('be.visible')
        cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
        cy.wait(100)
        cy.addItemSubscription('Subscription B')
        cy.addFixedDiscount('Subscription B','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

        // Checkout successfully - Offers
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 Offer without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.addPercentageDiscount('Down Payment Offer','40','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with fixed discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemOffer('Down Payment Offer')
        cy.addFixedDiscount('Down Payment Offer','5','15')
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

    // Checkout successfully - Services Invoices
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service without discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Short Hair')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a percentage discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Hair Cut')
        cy.addPercentageDiscount('Hair Cut','40','15')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })

    it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a fix discount', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemService('Long Hair')
        cy.addFixedDiscount('Long Hair','5','15')
        cy.fillButton('Cash')
        cy.addEmployee('Zumba')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })  

    // checkout successfully - Giftcards Invoices

    it.only(' Verify that the invoice is successfully sent by email - Walkin - GiftCard', () => {
        cy.newCheckout("URL_BetaVendor_Production")
        cy.addItemGiftCard("243.48 KWD Gift Card")
        cy.fillButton('Cash')
        cy.expectedMessageCompleteSale('Sale Completed')
        cy.contains('button','Send').should('be.visible')
        cy.contains('button','Send').click({force: true})
        cy.contains('div>h3','Send Email').should('be.visible')
        cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
        cy.get('div[position="right"]').find('button','Send').should('be.visible')
        cy.get('div[position="right"]').find('button','Send').click({force: true})
        cy.contains('span', 'Email has been sent').should('exist')
    })
})

// describe.skip('Production - Beta Vendor Admin | Calendar| New Checkout | logged with Staff Credentials', () => {

//     before(() => {
//         // ensure clean test slate for these tests
//         cy.then(Cypress.session.clearAllSavedSessions)
//     })
    
//     beforeEach(() => {
//         cy.login('Staff Session', Cypress.env("Vendor1_Staff_Username_Production"), Cypress.env("Vendor1_Staff_Password_Production"))
//     })

//     afterEach(() => {
//         cy.clearCookies()
//     })

//         // Checkout successfully - Subscriptions
//     it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription without discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.contains('button','Change customer').click()
//         cy.contains('div','Search customer..').should('be.visible')
//         cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
//         cy.wait(100)
//         cy.addItemSubscription('Subscription B')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })
//     it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with percentage discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.contains('button','Change customer').click()
//         cy.contains('div','Search customer..').should('be.visible')
//         cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
//         cy.wait(100)
//         cy.addItemSubscription('Subscription B')
//         cy.addPercentageDiscount('Subscription B','40')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })

//     it(' Verify that the invoice is successfully sent by email - Customer added - 1 Subscription with fixed discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.contains('button','Change customer').click()
//         cy.contains('div','Search customer..').should('be.visible')
//         cy.contains('div','Search customer..').next().find('input').type('Alejandra Dugar{enter}', { delay: 1000})
//         cy.wait(100)
//         cy.addItemSubscription('Subscription B')
//         cy.addFixedDiscount('Subscription B','5')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         // cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })  

//         // Checkout successfully - Offers
//     it(' Verify that the invoice is successfully sent by email - Walkin - 1 Offer without discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemOffer('Down Payment Offer')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })
//     it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with percentage discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemOffer('Down Payment Offer')
//         cy.addPercentageDiscount('Down Payment Offer','40')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })

//     it(' Verify that the invoice is successfully sent by email - Walking - 1 Offer with fixed discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemOffer('Down Payment Offer')
//         cy.addFixedDiscount('Down Payment Offer','5')
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })  

//     // Checkout successfully - Services Invoices
//     it(' Verify that the invoice is successfully sent by email - Walkin - 1 service without discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemService('Short Hair')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })
//     it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a percentage discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemService('Hair Cut')
//         cy.addPercentageDiscount('Hair Cut','40')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })

//     it(' Verify that the invoice is successfully sent by email - Walkin - 1 service with a fix discount', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemService('Long Hair')
//         cy.addFixedDiscount('Long Hair','5')
//         cy.fillButton('Cash')
//         cy.addEmployee('Zumba')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
//     })  

//     // checkout successfully - Giftcards Invoices

//     it(' Verify that the invoice is successfully sent by email - Walkin - GiftCard', () => {
//         cy.newCheckout("URL_BetaVendor_Production")
//         cy.addItemGiftCard("243.48 SAR Gift Card")
//         cy.fillButton('Cash')
//         cy.expectedMessageCompleteSale('Sale Completed')
//         cy.contains('button','Send').should('be.visible')
//         cy.contains('button','Send').click({force: true})
//         cy.contains('div>h3','Send Email').should('be.visible')
//         cy.get('input[name="Email"]').type('dugarerika@gmail.com')     
//         cy.get('div[position="right"]').find('button','Send').should('be.visible')
//         cy.get('div[position="right"]').find('button','Send').click({force: true})
//         cy.contains('span', 'Email has been sent').should('exist')
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