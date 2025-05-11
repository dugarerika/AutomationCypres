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
    cy.contains('button', 'Create').should('exist')
    cy.contains('button', 'Create').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
}

const filloutCustInfo = (first_name, last_name, notes, mobile_number) => {
    cy.get('input[placeholder="First Name"]').should('exist')
    cy.get('input[placeholder="First Name"]').type(first_name)
    cy.get('input[placeholder="Last Name"]').should('exist')
    cy.get('input[placeholder="Last Name"]').type(last_name)
    cy.get('textarea[placeholder="Notes"]').should('exist')
    cy.get('textarea[placeholder="Notes"]').type(notes)
    cy.get('input[placeholder="Mobile Number"]').should('exist')
    cy.get('input[placeholder="Mobile Number"]').type(mobile_number)
}

const accessToCustSection = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
    cy.contains('button>span','Customers').should('exist')
    cy.contains('button>span','Customers').click({ force: true })
    cy.contains('div','Customers').should('exist')
    cy.contains('div','Blacklists').should('exist')
    cy.contains('div','Reviews').should('exist')
}

const accessToAddCustForm = () => {
    cy.contains('button','ADD NEW').should('exist')
    cy.contains('button','ADD NEW').click({ force: true })
    cy.contains('h6','New Customer', { matchCase: false }).should('exist')
}

const selectSubsService = () => {
    cy.contains('div>button','Add another service').should('exist')
    cy.contains('div>button','Add another service').click({ force: true })
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
    cy.contains('label>span','Number of Sessions', { matchCase: false }).parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Number of Sessions', { matchCase: false }).parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Notes').parent().next('div').find('textarea').eq(0).clear({ force: true })
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Description').parent().next('div').find('textarea').eq(0).clear({ force: true })
}

describe('Staging - Beta Vendor Admin | Customer | Create Customer| logged with Admin credentials', () => {

beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
})

afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
})

    it('Verify it is possible access to the Customer section', () => {
        accessToCustSection()
    })

    it('Verify there is a button to create a customer in the Customer section', () => {
        accessToCustSection()
        cy.contains('button','ADD NEW').should('exist')
    })

// Add Customer form fiels validation

    it('Verify it is not possible to submit an empty new customer form', () => {
        accessToCustSection()
        accessToAddCustForm()
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the Customer First Name is required', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo('{enter}', randUsername1, '{enter}', '{enter}')
        expectedMessageCreateCustomer('Customer first name is required')
    })

    it('Verify that the Customer Mobile is required', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, randUsername1, '{enter}', '{enter}')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it('Verify that the Phone Number is validated', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, randUsername1, '{enter}', '78689008')
        expectedMessageCreateCustomer('Invalid mobile number')
    })

    it.skip('Verify that the Phone Number is validated', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', '78689008')
        expectedMessageCreateCustomer('Invalid mobile number')
    })
})

