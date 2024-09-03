/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

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

const filloutOfferInfo =() =>{

}


const expectedMessageCreateProduct = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('span', product_message).should('exist')
}

describe('Beta Vendor Admin | Promotions/Offer | Create Offer| logged with Admin credentials', () => {

beforeEach(() => {
    login('Admin Section', 'pinkdoor', '1234567890')
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