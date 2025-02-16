/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name, () => {
    //cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.visit(Cypress.env("URL_BetaVendor_Staging"))
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

const accessCategory = () => {
  //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Options').should('exist')
  cy.contains('Options').click({ force: true })
  cy.contains('Category').should('exist')
  cy.contains('Category').click({ force: true })
}

const filloutSupplierForm = (sup_name, sup_description, sup_first_name, sup_last_name, sup_contact_mobile, sup_contact_email) => {
  cy.contains('h3', 'Add New Supplier').should('exist')
  cy.contains('h6', 'Supplier Details').should('exist')
  cy.contains('label>span', 'Supplier Name').should('exist')
  cy.contains('label>span', 'Supplier Name').parent().next('div').find('input').type(sup_name)
  cy.contains('label>span', 'Supplier Description').should('exist')
  cy.contains('label>span', 'Supplier Description').parent().next('div').find('textarea').first().type(sup_description)
  cy.contains('label>span', 'Contact First Name').should('exist')
  cy.contains('label>span', 'Contact First Name').parent().next('div').find('input').type(sup_first_name)
  cy.contains('label>span', 'Contact Last Name').should('exist')
  cy.contains('label>span', 'Contact Last Name').parent().next('div').find('input').type(sup_last_name)
  cy.contains('label>span', 'Contact Mobile').should('exist')
  cy.contains('label>span', 'Contact Mobile').parent().next('div').find('input').type(sup_contact_mobile)
  cy.contains('label>span', 'Contact email').should('exist')
  cy.contains('label>span', 'Contact email').parent().next('div').find('input').type(sup_contact_email)
}

const expectedMessageCreateSupplier = (supplier_message) => {
  cy.contains('button', 'Save').should('exist')
  cy.contains('button', 'Save').click()
  cy.contains('span', supplier_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Delete Suppliers|logged with Admin credentials', () =>{

    beforeEach(() => {
      cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
    })

    afterEach(() => {
        // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
        cy.clearCookies()
    })

    it('Verify it is possible delete category- Admin credentials', () => {
        //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
        cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
        cy.contains('Inventory').should('exist')
        cy.contains('Inventory').click({ force: true })
        cy.contains('Products').should('exist')
        cy.contains('Products').click({ force: true })
        cy.contains('Options').should('exist')
        cy.contains('Options').click({ force: true })
        cy.contains('li','Category').should('exist')
        cy.contains('li','Category').click({ force: true })
    })
    
})
