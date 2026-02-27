/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Employee | Delete Employee| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.login('Admin Section', Cypress.expose("Vendor0_Admin_Username_Staging"), Cypress.expose("Vendor0_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

//Delete Successfully
  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })

  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })

  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })

  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })

  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })

  it('Verify it is possible Delete Employee from the Employees list section', () => {
    cy.deleteEmployee()
  })
})