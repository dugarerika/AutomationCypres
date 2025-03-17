/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

describe('Staging - Beta Vendor Admin | Inventory | Delete products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogogitut=true')
    cy.clearCookies()
  })


//Delete Successfully
  it.only('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

  it('Verify it is possible Delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'auth')
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.contains('h3', 'Product details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    // cy.get('div[row-id="0"]').find('tr').its('length').then(count => {
    //   if (count) {   // not count >= 0, because 0 means no elements
    //     cy.log(`there are ${count - 1} elements`)
    //   }
    // })
  })

})