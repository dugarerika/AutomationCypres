/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randUsername1 = `teststf${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `teststf${faker.number.int({ min: 10, max: 100 })}`

const login = (name, username, password) => {
    cy.session(name, () => {
        cy.visit('https://beta.vendor.bookr-dev.com/')
        cy.url().should('include', 'https://beta.vendor.bookr-dev.com/auth')
        cy.get('[type="text"]').should('be.visible')
        cy.get('[type="password"]').should('be.visible')
        cy.xpath('//button[text()="Login"]').should('be.visible')
        cy.get('[type="text"]').type(username, { force: true, delay: 50 })
        cy.get('[type="password"]').type(password, { force: true, delay: 50 })
        cy.intercept('POST', '/api/main/auth/login').as('sign')
        cy.xpath('//button[text()="Login"]').click()
        cy.wait('@sign').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
        })
    })
}

const expectedMessageCreateSubs = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
}

const filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description) => {
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).type(sub_name)
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).type(sub_price)
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).type(sub_expiration)
    cy.contains('label>span','Number of sessions').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Number of sessions').parent().next('div').find('input').eq(0).type(sub_sessions)
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).type(sub_notes)
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).type(sub_description)
}

const accessToSubsSection = () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('button>span','Subscriptions').should('exist')
    cy.contains('button>span','Subscriptions').click({ force: true })
    cy.contains('h6','Subscriptions').should('exist')
}

const accessToAddSubsForm = () => {
    cy.contains('h6','Subscriptions').parent().next('div').find('button').should('exist')
    cy.contains('h6','Subscriptions').parent().next('div').find('button').click({ force: true })
    cy.contains('h3','Add a subscription').parent().next('div').find('button').should('exist')
}

const selectSubsService = () => {
    cy.contains('div>button','Add Service').should('exist')
    cy.contains('div>button','Add Service').click({ force: true })
    cy.contains('div>div','Select service').should('exist')
    cy.contains('div>div','Select service').click({ force: true })
    cy.contains('div>div','Select service').next('div').find('input').type('{downarrow}{enter}',{ force: true })
}

const accessToEditSubsForm = () => {
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
}

const clearUpdateForm = () => {
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).clear()
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Number of sessions').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Number of sessions').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).clear({ force: true })
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).clear({ force: true })
}

describe('Beta Vendor Admin | Employee | Create Subscription| logged with Admin credentials', () => {

beforeEach(() => {
    login('Admin Section', 'pinkdoor', '1234567890')
})

afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
})

it('Verify it is possible access to the Subscription section- Admin credentials', () => {
    accessToSubsSection()
})

// Add Subscription form fiels validation

it('Verify that the Add Subscription Service is required', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    filloutSubscriptionInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
    expectedMessageCreateSubs('Please select at least one service')
})

it('Verify that the Add Subscription Name is required', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    expectedMessageCreateSubs('Name is required')
})

it('Verify that the Add Subscription Name must be at least 3 characters', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    filloutSubscriptionInfo(10,10,20,30,'Notes10','Description10')
    expectedMessageCreateSubs('Name must be at least 3 characters')
})

it('Verify that the Add Subscription Price is required', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubPrice Required','{enter}',2,3,'Notes','Description')
    expectedMessageCreateSubs('Price is required')
})

it('Verify that the Add Subscription Price must be greater than Zero', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubPrice greater than 0',0,2,3,'Notes','Description')
    expectedMessageCreateSubs('Price must be greater than 0')
})

it('Verify that the Add Subscription Price allow decimal numbers', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubPrice Zeropoint1',0.1,2,3,'Notes','Description')
    expectedMessageCreateSubs('Subscription created')
})

it('Verify that the Add Subscription Description field is optional', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubDescription is optional',0.101,2,3,'Notes for Description is optional','{enter}')
    expectedMessageCreateSubs('Subscription created')
})

it('Verify that the Add Subscription Notes field is optional', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,2,3,'{enter}','Description test for Notes is optional')
    expectedMessageCreateSubs('Subscription created')
})

it('Verify that the Add Subscription Number of Sessions is required  ', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,2,'{enter}','Notes','Description')
    expectedMessageCreateSubs('Number of sessions is required')
})

it('Verify that the Add Subscription Number of Sessions must be greater than Zero', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,2,0,'Notes','Description')
    expectedMessageCreateSubs('Number of sessions must be greater than 0')
})

it('Verify that the Add Subscription Number of Sessions must be an integer', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',10.10,2,2.1,'Notes','Description')
    expectedMessageCreateSubs('Number of sessions must be an integer number')
})

it('Verify that the Add Subscription Expiration in days is required', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,'{enter}',1000,'Notes','Description')
    expectedMessageCreateSubs('Expiration is required')
})

it('Verify that the Add Subscription Expiration in days must be greater than Zero', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,0,8,'Notes','Description')
    expectedMessageCreateSubs('Expiration must be greater than 0')
})

it('Verify that the Add Subscription Expiration in days must be an integer', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,8.1,1000,'Notes','Description')
    expectedMessageCreateSubs('Expiration must be an integer number')
})

it('Verify that the Add Subscription Service: Add another service allows the user to add multiple services', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    expectedMessageCreateSubs('Subscription created')
})

it('Verify that the Add Subscription Service: Services can be removed ', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    expectedMessageCreateSubs('Please select at least one service')
})

it('Verify that the Add Subscription Service: Add another service allows the user to add multiple services', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    expectedMessageCreateSubs('Subscription created')
})

})

describe('Beta Vendor Admin | Employee | Update Subscription| logged with Admin credentials', () => {

    beforeEach(() => {
        login('Admin Section', 'pinkdoor', '1234567890')
    })
    
    afterEach(() => {
        // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
        cy.clearCookies()
    })

// Edit Subscription form fiels validation
it('Verify that the Update Subscription allows the user to remove services', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateSubs('Please select at least one service')
})

it('Verify that the Update Subscription Service is required', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateSubs('Please select at least one service')
})

it('Verify that the Update Subscription Name is required', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    expectedMessageCreateSubs('Name is required')
})

it('Verify that the update Subscription Name must be at least 3 characters', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    filloutSubscriptionInfo(10,10,20,30,'Notes10','Description10')
    expectedMessageCreateSubs('Name must be at least 3 characters')
})

it('Verify that the update Subscription Price is required', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    filloutSubscriptionInfo('SubPrice Required','{enter}',2,3,'Notes','Description')
    expectedMessageCreateSubs('Price is required')
})

it('Verify that the Update Subscription Price must be greater than Zero', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubPrice greater than 0',0,2,3,'Notes','Description')
    expectedMessageCreateSubs('Price must be greater than 0')
})

it('Verify that the Update Subscription Price allow decimal numbers', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubPrice Zeropoint1',0.1,2,3,'Notes','Description')
    expectedMessageCreateSubs('Subscription Updated Succesfully')
})

it('Verify that the Update Subscription Description field is optional', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('update SubDescription is optional', 0.101, 2, 3, 'Notes for Description is optional','{enter}')
    expectedMessageCreateSubs('Subscription Updated Succesfully')
})

it('Verify that the Add Subscription Notes field is optional', () => {
    accessToSubsSection()
    accessToEditSubsForm()
    clearUpdateForm()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('Update SubNotes is optional',0.1,2,3,'{enter}','Description test for Notes is optional')
    expectedMessageCreateSubs('Subscription Updated Succesfully')
})

it('Verify that the Add Subscription Number of Sessions is required  ', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,2,'{enter}','Notes','Description')
    expectedMessageCreateSubs('Number of sessions is required')
})

it.skip('Verify that the Add Subscription Number of Sessions must be greater than Zero', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,2,0,'Notes','Description')
    expectedMessageCreateSubs('Number of sessions must be greater than 0')
})

it.skip('Verify that the Add Subscription Number of Sessions must be an integer', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',10.10,2,2.1,'Notes','Description')
    expectedMessageCreateSubs('Number of sessions must be an integer number')
})

it.skip('Verify that the Add Subscription Expiration in days is required', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,'{enter}',1000,'Notes','Description')
    expectedMessageCreateSubs('Expiration is required')
})

it.skip('Verify that the Add Subscription Expiration in days must be greater than Zero', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,0,8,'Notes','Description')
    expectedMessageCreateSubs('Expiration must be greater than 0')
})

it.skip('Verify that the Add Subscription Expiration in days must be an integer', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('SubNotes is optional',0.1,8.1,1000,'Notes','Description')
    expectedMessageCreateSubs('Expiration must be an integer number')
})

it.skip('Verify that the Add Subscription Service: Add another service allows the user to add multiple services', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    expectedMessageCreateSubs('Subscription created')
})

it.skip('Verify that the Add Subscription Service: Services can be removed ', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    expectedMessageCreateSubs('Please select at least one service')
})

it.skip('Verify that the Add Subscription Service: Add another service allows the user to add multiple services', () => {
    accessToSubsSection()
    accessToAddSubsForm()
    selectSubsService()
    selectSubsService()
    // filloutSubscriptionInfo = (sub_name, sub_price, sub_expiration, sub_sessions, sub_notes, sub_description)
    filloutSubscriptionInfo('Subscription linked to 4 services',9.1,3,1000,'Notes','Description')
    expectedMessageCreateSubs('Subscription created')
})

})



// Verify that the Add Subscription set Enable toggle OFF  


// Verify a subscription can be deleted when confirming the action.  

// Verify that after deleting a subscription the Subscription list gets updated.  

// Verify a subscription can not be deleted when canceling the action.  


// Update Subscription Form:

// Verify that the 'Update Subscription' Service is required. 

// Verify that the 'Update Subscription' Name is required. 

// Verify that the 'Update Subscription' Name must be at least 3 characters  

// @Obafemi Joseph  It is allowing to create a subscription with a 1 character name

// Verify that the 'Update Subscription' Description is an optional field 

// Verify that the 'Update Subscription' Notes is optional field 

// Verify that the 'Update Subscription' set Enable toggle ON 	

// Verify that the 'Update Subscription' set Enable toggle OFF 

// Verify that the 'Update Subscription' Price is required 

// Verify that the 'Add' Subscription Price must be greater than 0 

// Verify that the 'Update Subscription' Price allowed decimal number  

// Verify that the 'Update Subscription' Number of Sessions is required 

// Verify that the 'Add' Subscription Number of Sessions must be an integer 

// Verify that the 'Update Subscription' Number of Sessions must be greater than Zero 

// Verify that the 'Update Subscription' Expiration in days is required 

// Verify that the 'Add' Subscription Expiration in days must be an integer. 

// Verify that the 'Update Subscription' Expiration in days must be greater than Zero 

// Verify that the 'Update Subscription' Service: dropdown matches current services available 

// Verify that the 'Update Subscription' Service: Add another service allows the user to add multiple services 

// Verify that the 'Update Subscription' Subscription Service: Services are added correctly to the Subscription	

// Verify that the 'Update Subscription' Service: Services can be removed 

