  /// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

describe('Staging - Beta Vendor Admin | Inventory | Create products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Shower Gel Retails sales ON- Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.wait(200)
    cy.contains('span','Enable Retail Sales').click({ force: true })
    cy.wait(200)
    cy.filloutProductBasicInfo('Shower Gel Retails sales ON','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
    cy.wait(200)
    cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax & Enable Retails sales toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name').parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.contains('label>span', 'Bookr Category').should('exist')
    cy.contains('label>span', 'Bookr Category').parents('label').next('div').find('input').click({ force: true }).type('{downarrow}{enter}')
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Shower Gel Retails sales OFF- Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.wait(200)
    // cy.contains('span','Enable Retail Sales').click({ force: true })
    cy.wait(200)
    cy.filloutProductBasicInfo('Shower Gel Retails sales OFF','{enter}','{enter}','{enter}','{enter}')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name').parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.contains('label>span', 'Bookr Category').should('exist')
    cy.contains('label>span', 'Bookr Category').parents('label').next('div').find('input').click({ force: true }).type('{downarrow}{enter}')
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

})