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
    cy.visit(Cypress.env("URL_Production") + 'auth')
    cy.contains('button>span','Customers').should('be.visible')
    cy.contains('button>span','Customers').click({ force: true })
    cy.contains('div','Customers').should('be.visible')
    cy.contains('div','Blacklists').should('be.visible')
    cy.contains('div','Reviews').should('be.visible')
}

const accessToBlackTab = () => {
    cy.visit(Cypress.env("URL_Production") + 'auth')
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

describe('Production - Beta Vendor Admin | Customer | Customers Sort and Filters| logged with Admin credentials', () => {

beforeEach(() => {
    cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
})

afterEach(() => {
    cy.clearCookies()
})

// Customer List Sort
    it.skip('Verify it is possible to sort the customer list by Created At (Oldest to Newest)', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to sor the customer list by Created At (Newest to Oldest)', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to sor the customer list by First Name (A-Z)', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to sor the customer list by First Name (Z-A)', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

// Customer List Filter 
    it.skip('Verify it is possible to Filter by Higtest Spend with Time of Period Past Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    
    it.skip('Verify it is possible to Filter by Higtest Spend with Time of Period Past 3 Months', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Has a Birthday with Time of Period Next Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Has a Birthday with Time of Period Past Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Service with Time of Period Past Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Service with Time of Period Past Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Service with Time of Period Past 3 Months', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Service with Time of Period Past 6 Months', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Has Not Visited Time of Period Past Month', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

    it.skip('Verify it is possible to Filter by Has Not Visited Time of Period Past 3 Months', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })

// Customer Details
    it.skip('Verify it is possible to access to customer details', () => {
        accessToCustSection()
        accessToAddCustForm()
        filloutCustInfo(randUsername2, '{enter}', '{enter}', 'werty5')
        cy.contains('span','Value contains no numbers').should('be.visible')
        expectedMessageCreateCustomer('Customer mobile is required')
    })
})

