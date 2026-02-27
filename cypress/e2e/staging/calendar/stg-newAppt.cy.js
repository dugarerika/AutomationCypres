/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Calendar| Create New Appointment on the Calendar through Add New/New Appointment | logged with Admin Credentials', () => {

    // before(() => {
    //     // ensure clean test slate for these tests
    //     cy.then(Cypress.session.clearAllSavedSessions)
    // })
    
    beforeEach(() => {
        // cy.clearCookies()
        // cy.clearLocalStorage()
        cy.login('Admin Session', Cypress.expose("Vendor6_Admin_Username_Staging"), Cypress.expose("Vendor6_Admin_Password_Staging"))
        cy.visit(Cypress.expose("URL_Staging") + 'admin/calendar')
        // cy.contains('h3','Welcome Back!').next('button').click()
        cy.get('body').then(($body) => {
            if ($body.text().includes('Welcome Back!')) {
                cy.contains('h3', 'Welcome Back!').next('button').click()
                cy.wait(64)
            }
        })
        cy.wait(64)
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is possible to acces New Appointment modal by clicking on Add New/New Appointment on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')  
    })

    it('Verify duration is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Duration must be at least 1min').should('be.visible')
    })

    it('Verify employee is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Employee is required').should('be.visible')
    })

    it('Verify service is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Marly william{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Some services are not available').should('be.visible')
    })

    it('Verify customer is not required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Marly william{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    it('Verify it is possible to create an appointment changing the date', () => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const dayNow = new Date().toLocaleDateString("en-US",options)
        cy.log(dayNow)
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Date').parent('div').find('input').click()
        cy.get(`[aria-label ="${dayNow}"]`).parent('button').next('button').click({force: true})
        cy.get('body').trigger('click')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('09:00 PM{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    it('Verify Start time for the offer (1 service) is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('01:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Please Select Start Time for all Offer Services').should('be.visible')
    })

    it('Verify offer is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('03:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Some offers are not available').should('be.visible')
    })

    
    it('Verify it is possible to create a new appointment only for an offer (1 service)', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('ErikaT{downarrow}{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
        cy.get('.css-1dukv94').eq(0).children('button').click({force: true})
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })
})
describe('Staging - Beta Vendor Admin | Calendar| Create New Appointment on the Calendar through Add New/New Appointment | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })
    
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.login('Receptionist Session', Cypress.expose("Vendor6_Receptionist_Username_Staging"), Cypress.expose("Vendor6_Receptionist_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is possible to acces New Appointment modal by clicking on Add New/New Appointment on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')  
    })

    it('Verify duration is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Duration must be at least 1min').should('be.visible')
    })

    it('Verify employee is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Employee is required').should('be.visible')
    })

    it('Verify service is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Susan one{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Some services are not available').should('be.visible')
    })

    it('Verify customer is not required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('Naomi Naomi{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    it('Verify it is possible to create an appointment changing the date', () => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const dayNow = new Date().toLocaleDateString("en-US",options)
        cy.log(dayNow)
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Date').parent('div').find('input').click()
        cy.get(`[aria-label ="${dayNow}"]`).parent('button').next('button').click({force: true})
        cy.get('body').trigger('click')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('08:00 PM{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })

    it('Verify Start time for the offer (1 service) is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('01:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Please Select Start Time for all Offer Services').should('be.visible')
    })

    it('Verify offer is required in the New Appointment form on the Calendar', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
        cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('label','Start Time').parent('div').find('input').click().type('03:00 AM{enter}')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Some offers are not available').should('be.visible')
    })

    
    it('Verify it is possible to create a new appointment only for an offer (1 service)', () => {
        cy.newAppt("URL_Staging")
        cy.contains('New Appointment').should('be.visible')
        cy.contains('Add New Item').should('exist')  
        cy.contains('Add New Item').click()
        cy.contains('Add Offer').should('exist')  
        cy.contains('Add Offer').click()
        cy.contains('div','Offer').should('exist')  
        cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('Mateo{downarrow}{enter}')
        cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
        cy.get('.css-1dukv94').eq(0).children('button').click({force: true})
        cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
        cy.contains('div>span','Booking Created Successfully').should('be.visible')
    })
})
// describe('Staging - Beta Vendor Admin | Calendar| Create New Appointment on the Calendar through Add New/New Appointment | logged with Staff Credentials', () => {

//     before(() => {
//         // ensure clean test slate for these tests
//         cy.then(Cypress.session.clearAllSavedSessions)
//     })
    
//     beforeEach(() => {
//         cy.login('Staff Session', Cypress.expose("Vendor_Staff_Username_Staging"), Cypress.expose("Vendor_Staff_Password_Staging"))
//     })

//     afterEach(() => {
//         cy.clearCookies()
//     })

//     it('Verify it is possible to acces New Appointment modal by clicking on Add New/New Appointment on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')  
//     })

//     it('Verify duration is required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Duration must be at least 1min').should('be.visible')
//     })

//     it('Verify employee is required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Employee is required').should('be.visible')
//     })

//     it('Verify service is required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Some services are not available').should('be.visible')
//     })

//     it('Verify customer is not required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Booking Created Successfully').should('be.visible')
//     })

//     it('Verify it is possible to create an appointment changing the date', () => {
//         const options = {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         };
//         const dayNow = new Date().toLocaleDateString("en-US",options)
//         cy.log(dayNow)
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Date').parent('div').find('input').click()
//         cy.get(`[aria-label ="${dayNow}"]`).parent('button').next('button').click({force: true})
//         cy.get('body').trigger('click')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{downarrow}{enter}')
//         cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Start Time').parent('div').find('input').click().type('09:00 PM{enter}')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Booking Created Successfully').should('be.visible')
//     })

//     it('Verify Start time for the offer (1 service) is required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
//         cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Start Time').parent('div').find('input').click().type('01:00 AM{enter}')
//         cy.contains('Add New Item').should('exist')  
//         cy.contains('Add New Item').click()
//         cy.contains('Add Offer').should('exist')  
//         cy.contains('Add Offer').click()
//         cy.contains('div','Offer').should('exist')  
//         cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Please Select Start Time for all Offer Services').should('be.visible')
//     })

//     it('Verify offer is required in the New Appointment form on the Calendar', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('label','Duration').parent('div').find('input').click().type('30{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Staff').parent('div').find('input').click().type('ALEX ALEX{enter}')
//         cy.contains('label','Service').parent('div').find('input').click().type('{downarrow}{downarrow}{downarrow}{enter}')
//         cy.contains('label','Start Time').parent('div').find('input').click().type('03:00 AM{enter}')
//         cy.contains('Add New Item').should('exist')  
//         cy.contains('Add New Item').click()
//         cy.contains('Add Offer').should('exist')  
//         cy.contains('Add Offer').click()
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Some offers are not available').should('be.visible')
//     })

    
//     it('Verify it is possible to create a new appointment only for an offer (1 service)', () => {
//         cy.newAppt("URL_Staging")
//         cy.contains('New Appointment').should('be.visible')
//         cy.contains('Add New Item').should('exist')  
//         cy.contains('Add New Item').click()
//         cy.contains('Add Offer').should('exist')  
//         cy.contains('Add Offer').click()
//         cy.contains('div','Offer').should('exist')  
//         cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
//         cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('ErikaT{downarrow}{enter}')
//         cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
//         cy.get('.css-1dukv94').eq(0).children('button').click({force: true})
//         cy.contains('button','Create Appointment').should('be.enabled').click({force: true})
//         cy.contains('div>span','Booking Created Successfully').should('be.visible')
//     })
// })