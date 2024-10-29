/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

describe('Staging - Beta Vendor Admin | Employee | Delete Employee| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

//Delete Successfully
  it.only('Verify it is possible Delete Employee from the Employees list section- Admin credentials', () => {
    cy.deleteEmployee()
  })

  it.only('Verify it is possible Delete Employee from the Employees list section- Admin credentials', () => {
    cy.deleteEmployee()
  })

  it.only('Verify it is possible Delete Employee from the Employees list section- Admin credentials', () => {
    cy.deleteEmployee()
  })

  it.only('Verify it is possible Delete Employee from the Employees list section- Admin credentials', () => {
    cy.deleteEmployee()
  })
})