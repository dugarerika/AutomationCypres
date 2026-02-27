/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name, () => {
    cy.visit(Cypress.expose("URL_Production"))
    cy.url().should('include', 'https://beta.vendor.bookr-dev.com/auth')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.xpath('//button[text()="Login"]').should('be.visible')
    cy.get('[type="text"]').type(username, { force: true, delay: 35 })
    cy.get('[type="password"]').type(password, { force: true, delay: 35 })
    cy.intercept('POST', '/api/main/auth/login').as('sign')
    cy.xpath('//button[text()="Login"]').click()
    cy.wait('@sign').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })
}

const accessCategory = () => {
  cy.visit(Cypress.expose("URL_Production") + 'auth')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('Options').should('exist')
  cy.contains('Options').click({ force: true })
  cy.contains('li','Category').should('exist')
  cy.contains('li','Category').click({ force: true })
  cy.get('section>div>ul>li>*').eq(2).click()
  cy.contains('button','Delete').click({ force: true })
  cy.contains('span', 'Category deleted', { matchCase: false }).should('exist')
}

describe('Production - Beta Vendor Admin | Inventory | Delete Cateogories| logged with Admin credentials', () =>{

  beforeEach(() => {
    cy.loginprod('Admin Section', Cypress.expose("Vendor_Admin_Username_Production"), Cypress.expose("Vendor_Admin_Password_Production"))
  })

  afterEach(() => {
      cy.clearCookies()
  })

  it('Verify it is possible delete category', () => {
    accessCategory()
  })

  it('Verify it is possible delete category', () => {
    cy.visit(Cypress.expose("URL_Production") + 'auth')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('Options').should('exist')
    cy.contains('Options').click({ force: true })
    cy.contains('li','Category').should('exist')
    cy.contains('li','Category').click({ force: true })
    cy.get('section>div>ul>li>*').eq(2).click()
    cy.contains('button','Delete').click({ force: true })
    cy.contains('span', 'Category deleted', { matchCase: false }).should('exist')
  })
})
