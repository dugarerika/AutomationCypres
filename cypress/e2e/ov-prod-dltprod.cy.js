/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

const accessToCreateProduct = () => {
  cy.visit('https://vendor.bookr.co/calendar')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.wait(1000)
  cy.visit('https://vendor.bookr.co/inventory')
  cy.contains('div>h6', 'Products').should('exist')
  cy.contains('button', 'Add New').should('exist')
  cy.contains('button', 'Add New').click({ force: true })
  cy.contains('h3', 'Create Product').should('exist')
}

const filloutProductBasicInfo = (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
  cy.contains('button', 'Basic Info').should('exist')
  cy.contains('button', 'Basic Info').click({ force: true })
  cy.get('input[placeholder = "Enter product name"]').should('exist')
  cy.get('input[placeholder = "Enter product name"]').type(prod_name)
  cy.get('input[placeholder="Enter product barcode e.g 123456789"]').should('exist')
  cy.get('input[placeholder="Enter product barcode e.g 123456789"]').type(prod_barcode)
  cy.get('input[placeholder="Enter product measurement"]').should('exist')
  cy.get('input[placeholder="Enter product measurement"]').type(prod_measurement)
  cy.get('input[placeholder="Enter short description of the product"]').should('exist')
  cy.get('input[placeholder="Enter short description of the product"]').type(prod_short_description)
  cy.get('textarea[placeholder="Enter product description"]').should('exist')
  cy.get('textarea[placeholder="Enter product description"]').type(prod_description)
}

const filloutProductPricingInfo =(prod_supply_price, prod_retail_price) =>{
  cy.contains('button', 'Pricing').should('exist')
  cy.contains('button', 'Pricing').click({ force: true })
  cy.contains('h6', 'Pricing').should('exist')
  cy.contains('span', 'Supply Price').should('exist')
  cy.contains('span', 'Retail Price').should('exist')
  cy.contains('span', 'Enable Retail Sales').should('exist')
  cy.contains('span', 'Tax').should('exist')
  cy.contains('label>span', 'Supply Price').parents('label').next('div').find('input').type(prod_supply_price)
  cy.contains('label>span', 'Supply Price').should('exist')
  cy.contains('label>span', 'Retail Price').parents('label').next('div').find('input').type(prod_retail_price)
}

const filloutProductInventoryInfo =(prod_ksu, prod_stock_qty, prod_low_stock_lvl, prod_reorder_qty) =>{
  cy.contains('div>button', 'Inventory').should('exist')
  cy.contains('div>button', 'Inventory').click({ force: true })
  cy.contains('h6', 'Inventory').should('exist')
  cy.contains('span', 'Track Stock Quantity').should('exist')
  cy.contains('span', 'Receive Low Stock Notifications').should('exist')
  cy.contains('label>span', 'SKU (Stock Keeping Unit)').should('exist')
  cy.contains('label>span', 'SKU (Stock Keeping Unit)').parents('label').next('div').find('input').type(prod_ksu)
  cy.contains('label>span', 'Current Stock Quantity').should('exist')
  cy.contains('label>span', 'Current Stock Quantity').parents('label').next('div').find('input').type(prod_stock_qty)
  cy.contains('label>span', 'Low Stock Level').should('exist')
  cy.contains('label>span', 'Low Stock Level').parents('label').next('div').find('input').type(prod_low_stock_lvl)
  cy.contains('label>span', 'Reorder Quantity').should('exist')
  cy.contains('label>span', 'Reorder Quantity').parents('label').next('div').find('input').type(prod_reorder_qty)

}

const expectedMessageCreateProduct = (product_message) => {
  cy.contains('button', 'Save').should('exist')
  cy.contains('button', 'Save').click({ force: true })
  cy.contains('span', product_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Edit products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Admin Section', 'testsalon', 'testsalon1o')
  })

  afterEach(() => {
    // cy.visit('https://https://vendor.bookr.co/auth?nativeLogout=true')
    cy.clearCookies()
  })


//Delete Successfully
  it('Verify it is possible Edit products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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
    cy.visit('https://vendor.bookr.co/inventory')
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