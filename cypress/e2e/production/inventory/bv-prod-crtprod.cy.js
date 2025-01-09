  /// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

describe('Production - Beta Vendor Admin | Inventory | Create products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginprod('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is possible access to the Inventory/Product section- Admin credentials', () => {
    cy.visit('https://vendor-beta.bookr.co/admin/calendar')
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
  })

  it('Verify the it is possible access to the Create product form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
  })

//Navigation within the Creation Tabs
  it('Verify the it is possible access to the Create product/Basic info tab form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.contains('button', 'Basic info').should('exist')
    cy.contains('button', 'Basic info').click({ force: true })
    cy.contains('h6', 'Basic info').should('exist')
    cy.contains('span', 'Product name').should('exist')
    cy.contains('span', 'Produce barcode').should('exist')
    cy.contains('span', 'Product measurement').should('exist')
    cy.contains('span', 'Category').should('exist')
    cy.contains('span', 'Brand').should('exist')
    cy.contains('span', 'Short description').should('exist')
    cy.contains('span', 'Product description').should('exist')
  })

  it('Verify the it is possible access to the Create product/Pricing tab form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.contains('button', 'Pricing').should('exist')
    cy.contains('button', 'Pricing').click({ force: true })
    cy.contains('h6', 'Pricing').should('exist')
    cy.contains('span', 'Supply Price').should('exist')
    cy.contains('span', 'Retail price').should('exist')
    cy.contains('span', 'Enable Retail Sale').should('exist')
  })

  it('Verify the it is possible access to the Create product/Inventory tab form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.contains('div>button','Inventory').should('exist')
    cy.contains('div>button','Inventory').click({ force: true })
    cy.contains('div>h6','Inventory').should('exist')
    // cy.contains('label/span','`SKU (Stock Keeping Unit)`').should('exist')
    cy.contains('span','Supplier').should('exist')
    // cy.contains('label/span','Current Stock Qantity').should('exist')
    // cy.contains('span','Low Stock Level').should('exist')
  })

  //Create succesfully
  it('Verify it is possible to create a Product by filling up only the Product name - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name only','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Produce barcode - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and Bar code','123456789012','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product measurement with Mililiter Unit - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with and Product measurement with Mililiter Unit','{enter}','123','{enter}','{enter}')
    cy.contains('option', 'Select unit').should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Category created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category').should('exist')
    cy.contains('label>span', 'Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category name').parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.contains('label>span', 'Bookr Category').should('exist')
    cy.contains('label>span', 'Bookr Category').parents('label').next('div').find('input').click({ force: true }).type('{downarrow}{enter}')
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created').should('exist')
    cy.contains('label>span', 'Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Category - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category').should('exist')
    cy.contains('label>span', 'Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  
  it('Verify Product is create successfully by filling up Price Name and Selecting a Brand created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand').should('exist')
    cy.contains('label>span', 'Brand').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Brand name').parent().next('div').find('input').type('Automated Brand', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Brand created').should('exist')
    cy.contains('label>span', 'Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Brand - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand').should('exist')
    cy.contains('label>span', 'Brand').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short description - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and Short description','{enter}','{enter}','This is a Short description of the product','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product description - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and Product description','{enter}','{enter}','{enter}','This is a Product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short and Product description - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name Short and Product description','{enter}','{enter}','This is a Short description of the product','This is a Product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Supply Price - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('12345','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Supply Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Retail price - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('{enter}','6789')
    cy.filloutProductBasicInfo('Product filled up with Price name and Retail price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and SKU - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Low Stock Level - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductInventoryInfo('{enter}','{enter}','4','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Low Stock Level','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode, Short description, prod description and Reorder Quantity - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','90')
    cy.filloutProductBasicInfo('Product filled up with Price Name Produce barcode Short description prod description and Reorder Quantity','098765432112','{enter}','Prod Short description','Product description')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode EAN-13 4006381333931, and SKU12345-AB - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductInventoryInfo('SKU12345-AB','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 4006381333931 and SKU12345-AB','4006381333931','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode EAN-13 9780201379624, and SKU67890-CD  - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductInventoryInfo('SKU67890-CD','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 9780201379624 and SKU67890-CD','9780201379624','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Bar code EAN-13 5012345678900, SKU98765-GH, Retail price and Supply Price  - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductInventoryInfo('SKU98765-GH','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 5012345678900 and SKU98765-GH','5012345678900','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price and Retail price- Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductBasicInfo('Product filled up with Price name Supply & Retail price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail price, and Enable Retails sales toogle switched ON- Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('12345','10')
    cy.wait(100)
    cy.contains('span','Enable Retail Sale').click({ force: true })
    cy.wait(100)
    cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail price tax & Enable Retails sales toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

// Create Non successfully  

it('Verify it is no possible to create a Product by filling up Price Name and already added SKU - Admin credentials', () => {
  cy.accessToCreateProductbvprod()
  cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
  cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this SKU already exists')
})

it('Verify it is not possible to create a Product by filling up Price Name and already added Produce barcode - Admin credentials', () => {
  cy.accessToCreateProductbvprod()
  cy.filloutProductBasicInfo('Product filled up with Product name and Bar code','123456789012','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this Barcode already exists')
})

  it('Verify Product name is the required field by trying to create a product leaving empty all the fields- Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by tring to create a product, filling up barcode only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','1234567890123','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by trying to create a product, filling up Product measurement without unit only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','{enter}','1234567890','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by trying to create a product filling up Product measurement with unit only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.contains('option', 'Select unit').should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by trying to create a product filling up Short description only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','This is a Short description','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by trying to create a product filling up Product description only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','This is a Product description')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by triying to create a product filling up Supply Price only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('120','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product name is the only required field by trying to create a product by filling up Retail price only - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductPricingInfo('{enter}','567')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Measuarement cannot be submited without Units - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.contains('button', 'Basic info').should('exist')
    cy.contains('button', 'Basic info').click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type('Product Measuarement cannot be submited without Units')
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('123')
    cy.expectedMessageCreateProduct('unit must be one of the following values: ml, l, g, kg, oz, lb, cm, ft, in, whole')
  })

  it('Verify Product cannot be create when bar code is less than 12 digits - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and less than 12 digits Bar code','12345678901','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  
  it('Verify Product cannot be create when bar code is more than 12 digits - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and more than 12 digits Bar code','12345678901234','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product cannot be create when bar code is alphanumeric - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Product name and more than 12 digits Bar code','12345678901a','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Supplier created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProductbvprod()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Supplier','{enter}','{enter}','{enter}','{enter}')
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Supplier').should('exist')
    cy.contains('label>span', 'Supplier').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Suppliers').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    // cy.contains('h3','Create Supplier').should('exist')
    cy.contains('label>span','Supplier name').parent().next('div').find('input').type('Automated Supplier', { force: true, delay: 50 })
    cy.contains('span','Supplier description').parent().next('div').find('textarea').eq(0).type('Automated Supplier', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Supplier created successfully').should('exist')
    cy.expectedMessageCreateProduct('Product created successfully')
  })
})