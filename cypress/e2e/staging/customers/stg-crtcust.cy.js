/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randUsername1 = `teststf${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `teststf${faker.number.int({ min: 10, max: 100 })}`

const expectedMessageCreateCustomer = (product_message) => {
    cy.contains('button', 'Create').should('be.visible')
    cy.contains('button', 'Create').click({ force: true })
    cy.contains('div>span', product_message).should('be.visible')
}

const filloutCustInfo = (first_name, last_name, notes, mobile_number) => {
    cy.get('input[placeholder="First Name"]').should('be.visible')
    cy.get('input[placeholder="First Name"]').type(first_name)
    cy.get('input[placeholder="Last Name"]').should('be.visible')
    cy.get('input[placeholder="Last Name"]').type(last_name)
    cy.get('textarea[placeholder="Notes"]').should('be.visible')
    cy.get('textarea[placeholder="Notes"]').type(notes)
    cy.get('input[placeholder="Mobile Number"]').should('be.visible')
    cy.get('input[placeholder="Mobile Number"]').type(mobile_number)
}

const accessToCustSection = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
    cy.wait(100);
    cy.closeWelcomeBackBanner()
    cy.contains('button>span','Customers').should('be.visible')
    cy.contains('button>span','Customers').click({ force: true })
    cy.contains('div','Customers').should('be.visible')
    cy.contains('div','Blacklists').should('be.visible')
    cy.contains('div','Reviews').should('be.visible')
}

const accessToBlackTab = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
    cy.contains('button>span','Customers').should('be.visible')
    cy.contains('button>span','Customers').click({ force: true })
    cy.contains('div','Customers').should('be.visible')
    cy.contains('div','Blacklists').should('be.visible')
    cy.contains('div','Blacklists').click({ force: true })
    cy.contains('div','Reviews').should('be.visible')
}

const accessToAddCustForm = () => {
    cy.contains('button','ADD NEW').should('be.visible')
    cy.contains('button','ADD NEW').click({ force: true })
    cy.contains('h6','New Customer', { matchCase: false }).should('be.visible')
}

const selectSubsService = () => {
    cy.contains('div>button','Add another service').should('be.visible')
    cy.contains('div>button','Add another service').click({ force: true })
    cy.contains('div>div','Select service').should('be.visible')
    cy.contains('div>div','Select service').click({ force: true })
    cy.contains('div>div','Select service').next('div').find('input').type('{downarrow}{enter}',{ force: true })
}

const accessToEditSubsForm = () => {
    cy.get('tbody>*').should('be.visible')
    cy.get('tbody>*').first().click({ force: true })
}

const clearUpdateForm = () => {
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).should('be.visible')
    cy.contains('label>span','Name').parent().next('div').find('input').eq(0).clear()
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).should('be.visible')
    cy.contains('label>span','Price').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).should('be.visible')
    cy.contains('label>span','Expiration').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Number of Sessions', { matchCase: false }).parent().next('div').find('input').eq(0).should('be.visible')
    cy.contains('label>span','Number of Sessions', { matchCase: false }).parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).should('be.visible')
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).clear({ force: true })
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).should('be.visible')
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).clear({ force: true })
}

describe('Staging - Beta Vendor Admin | Customer | Create Customer| logged with Admin credentials', () => {

beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
})

afterEach(() => {
    cy.clearCookies()
})

    it('Verify it is possible access to the Customer section', () => {
        accessToCustSection()
    })

    it('Verify it is possible access to the Blacklist section', () => {
        accessToBlackTab()
    })

    it('Verify there is a button to create a customer in the Customer section', () => {
        accessToCustSection()
        cy.contains('button','ADD NEW').should('be.visible')
    })

// Add Customer form fiels validation

    it('Verify it is not possible to submit an empty new customer form', () => {
        accessToCustSection()
        accessToAddCustForm()
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the First Name field is required when only the Last Name is filled', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo('{enter}', randUsername1, '{enter}', '{enter}')
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the First Name field is required when Last Name and Mobile Number are filled.', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo('{enter}', randUsername1, '{enter}', '5688134485')
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the First Name field is required when Last Name, Mobile Number, and Notes are filled', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo('{enter}', randUsername1, 'Notes', '5688134485')
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the Mobile Number field is required when only the First Name is filled', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', '{enter}')
        expectedMessageCreateCustomer('Mobile Number is too short')
    })

    
    it('Verify that the Mobile Number field is required when First Name and Last Name are filled', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, randUsername1, '{enter}', '{enter}')
        expectedMessageCreateCustomer('Mobile Number is too short')
    })

    
    it('Verify that the Mobile Number field is required when First Name, Last Name, and Notes are filled.', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, randUsername1, '{enter}', '{enter}')
        expectedMessageCreateCustomer('Mobile Number is too short')
    })

    it('Verify Genders Male and Female are available', () => {
        accessToCustSection()
        accessToAddCustForm()
        cy.get('select').select('Female').should('be.visible')
        cy.get('select').select('Male').should('be.visible')
    })

    it('Verify Gender Females is default ', () => {
        accessToCustSection()
        accessToAddCustForm()
        cy.get('select').select('Female').should('be.visible')
    })

    it('Verify that the Phone Number is validated', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', '38717494')
        cy.get('select').select('Female')
        expectedMessageCreateCustomer('Invalid mobile number')
    })

    it('Verify that the Mobile Number field accepts only valid phone number formats', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty')
        // cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Mobile Number is too short')
    })

    it.skip('Verify it is possible to close the new customer form', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Mobile Number is too short')
    })
})

