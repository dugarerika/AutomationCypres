/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

const filloutOfferInfo =() =>{
}


const expectedMessageCreateProduct = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('span', product_message).should('exist')
}

describe('Beta Vendor Admin | Promotions/Offer | Create Offer| logged with Admin credentials', () => {

beforeEach(() => {
    cy.login('Admin Section', 'pinkdoor', '1234567890')
})

afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
})

it('Verify it is possible access to the Offers section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Promotions').should('exist')
    cy.contains('Promotions').click({ force: true })
    cy.contains('li>button','Offers').should('exist')
    cy.contains('li>button','Offers').click({ force: true })
    cy.contains('h6', 'Offers').should('exist')
})


it('Verify it is possible access to Add a new Offer- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Promotions').should('exist')
    cy.contains('Promotions').click({ force: true })
    cy.contains('li>button','Offers').should('exist')
    cy.contains('li>button','Offers').click({ force: true })
    cy.contains('h6', 'Offers').should('exist')
})

})