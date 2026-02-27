/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")


const accessToDeleteSuppliers = () => {
  cy.visit(Cypress.expose("URL_Staging") + 'auth')
  cy.contains('Inventory', { matchCase: false }).should('exist')
  cy.contains('Inventory', { matchCase: false }).click({ force: true })
  cy.contains('Supplier', { matchCase: false }).should('exist')
  cy.contains('Supplier', { matchCase: false }).click({ force: true })
  cy.contains('h6', 'Supplier', { matchCase: false }).should('exist')
  cy.get('tbody>*').should('exist')
  cy.get('tbody>*').first().click({ force: true })
  cy.contains('h3', 'Supplier Details', { matchCase: false }).should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this supplier?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this supplier?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Supplier deleted successfully').should('exist')
}

describe('Beta Vendor Admin | Inventory | Delete Suppliers|logged with Admin credentials', () =>{

  beforeEach(() => {
    cy.login('Admin Section', Cypress.expose("Vendor0_Admin_Username_Staging"), Cypress.expose("Vendor0_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is possible delete suplliers from the Inventory/Supplier list section', () => {
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
    accessToDeleteSuppliers()
  })
    
  it('Verify it is possible delete suplliers from the Inventory/Supplier list section', () => {
    accessToDeleteSuppliers()
  })

  it('Verify it is possible delete suplliers from the Inventory/Supplier list section', () => {
    accessToDeleteSuppliers()
  })
 
  it('Verify it is possible delete suplliers from the Inventory/Supplier list section', () => {
    accessToDeleteSuppliers()
  })

  it('Verify it is possible delete suplliers from the Inventory/Supplier list section', () => {
    accessToDeleteSuppliers()
  })
})