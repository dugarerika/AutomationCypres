/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

describe('Production - Old Vendor Admin | Inventory | Edit products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
  })

  afterEach(() => {
    // cy.visit('https://https://vendor.bookr.co/auth?nativeLogout=true')
    cy.clearCookies()
  })


//Delete Successfully

it('Verify it is possible Edit products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})


it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
  // cy.visit('https://vendor.bookr.co/inventory')
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('h6', 'Products').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
  cy.contains('h3', 'Product Details').should('exist')
  cy.contains('button', 'Delete').should('exist')
  cy.contains('button', 'Delete').click({ force: true })
  cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
  cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
  cy.contains('span', 'Product deleted successfully').should('exist')
  cy.get('tbody').find('tr').its('length').then(count => {
    if (count) {   // not count >= 0, because 0 means no elements
      cy.log(`there are ${count - 1} elements`)
    }
  })
})

  it('Verify it is possible Edit products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })


  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

  it('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    // cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this product?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this product?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Product deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
      }
    })
  })

})