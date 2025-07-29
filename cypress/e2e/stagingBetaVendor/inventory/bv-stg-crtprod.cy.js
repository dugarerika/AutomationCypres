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

  it('Verify it is possible access to the Inventory/Product section', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
  })

  it('Verify the it is possible access to the Create product form ', () => {
    cy.accessToCreateProduct()
  })

//Navigation within the Creation Tabs
  it('Verify the it is possible access to the Create product/Basic info tab form ', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('span', 'Product Name', { matchCase: false }).should('exist')
    cy.contains('span', 'Produce barcode', { matchCase: false }).should('exist')
    cy.contains('span', 'Product Measurement', { matchCase: false }).should('exist')
    cy.contains('span', 'Category', { matchCase: false }).should('exist')
    cy.contains('span', 'Brand', { matchCase: false }).should('exist')
    cy.contains('span', 'Short Description', { matchCase: false }).should('exist')
    cy.contains('span', 'Product Description', { matchCase: false }).should('exist')
  })

  it('Verify the it is possible access to the Create product/Pricing tab form ', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Retail Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Enable Retail Sale', { matchCase: false }).should('exist')
  })

  it('Verify the it is possible access to the Create product/Inventory tab form ', () => {
    cy.accessToCreateProduct()
    cy.contains('div>button','Inventory', { matchCase: false }).should('exist')
    cy.contains('div>button','Inventory', { matchCase: false }).click({ force: true })
    cy.contains('div>h6','Inventory', { matchCase: false }).should('exist')
    // cy.contains('label/span','`SKU (Stock Keeping Unit)`').should('exist')
    cy.contains('span','Supplier', { matchCase: false }).should('exist')
    // cy.contains('label/span','Current Stock Qantity').should('exist')
    // cy.contains('span','Low Stock Level').should('exist')
  })

  //Create succesfully
  it('Verify it is possible to create a Product by filling up only the Product Name ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name only','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Produce barcode ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789012','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product Measurement with Mililiter Unit ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with and Product Measurement with Mililiter Unit','{enter}','123','{enter}','{enter}')
    cy.contains('option', 'Select Unit', { matchCase: false }).should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Bookr Category is requested when creating a Product by filling up Price Name and Selecting a Product Category created from the Create product form ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name', { matchCase: false }).parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Please select a bookr category', { matchCase: false }).should('exist')
    // cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    // cy.contains('h3', 'Categories').should('exist')
    // cy.get('section>div>ul>*').first().click({ force: true })
    // cy.expectedMessageCreateProduct('Please select a bookr category')
  })
  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Category created from the Create product form ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name', { matchCase: false }).parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.contains('label>span', 'Bookr Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Bookr Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true }).type('{downarrow}{enter}')
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Category ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  
  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Brand created from the Create product form ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Brand', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Brand Name', { matchCase: false }).parent().next('div').find('input').type('Automated Brand', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Brand created' , { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Brand ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Brand', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short description ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Short Description','{enter}','{enter}','This is a short description of the product','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product description ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Product Description','{enter}','{enter}','{enter}','This is a product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short and product description ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name Short and product Description','{enter}','{enter}','This is a short description of the product','This is a product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Supply Price ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Supply Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Retail Price ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('{enter}','6789')
    cy.filloutProductBasicInfo('Product filled up with Price name and Retail Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and SKU ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Low Stock Level ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('{enter}','{enter}','4','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Low Stock Level','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode, short description, prod description and Reorder Quantity ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','90')
    cy.filloutProductBasicInfo('Product filled up with Price Name Produce barcode short description prod description and Reorder Quantity','098765432112','{enter}','Prod short description','Product description')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode EAN-13 4006381333931, and SKU12345-AB ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('SKU12345-AB','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 4006381333931 and SKU12345-AB','4006381333931','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Produce barcode EAN-13 9780201379624, and SKU67890-CD  ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('SKU67890-CD','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 9780201379624 and SKU67890-CD','9780201379624','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Bar code EAN-13 5012345678900, SKU98765-GH, Retail Price and Supply Price  ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductInventoryInfo('SKU98765-GH','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 5012345678900 and SKU98765-GH','5012345678900','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price and Retail Price', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductBasicInfo('Product filled up with Price name Supply & Retail Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price, and Enable Retails sales toogle switched ON', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.wait(200)
    cy.contains('span','Enable Retail Sale').click({ force: true })
    cy.wait(200)
    cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax & Enable Retails sales toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price, and Enable Retails sales toogle Track Stock Quantity ON', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductInventoryInfo('SKU98765-GI','{enter}','{enter}','{enter}')
    cy.wait(100)
    cy.contains('span','Track Stock Quantity', { matchCase: false }).click({ force: true })
    cy.wait(100)
    cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax & Track Stock Quantity toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  // it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price, Enable Retails sales and Enable Retails sales toogle Track Stock Quantity ON', () => {
  //   cy.accessToCreateProduct()
  //   cy.filloutProductInventoryInfo('SKU77777-GI','{enter}','3','80')
  //   cy.wait(200)
  //   cy.contains('span','Track Stock Quantity').should('exist')
  //   cy.contains('span','Track Stock Quantity').click({ force: true })
  //   cy.wait(9000)
  //   cy.filloutProductPricingInfo('12345','10')
  //   cy.wait(2000)
  //   cy.contains('span','Enable Retail Sale').click({ force: true })
  //   cy.wait(2000)
  //   cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax Enable Retails sales & Track Stock Quantity toggle switched ON','{enter}','{enter}','{enter}','{enter}')
  //   cy.expectedMessageCreateProduct('Product created successfully')
  // })



// Create Non successfully  
it.skip('Verify it is no possible to create a Product by filling up Price Name and already added SKU ', () => {
  cy.accessToCreateProduct()
  cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
  cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this SKU already exists')
})

it('Verify it is not possible to create a Product by filling up Price Name and already added Produce barcode ', () => {
  cy.accessToCreateProduct()
  cy.filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789012','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this Barcode already exists')
})

  it('Verify Product Name is the required field by trying to create a product leaving empty all the fields', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by tring to create a product, filling up barcode only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','1234567890123','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product, filling up Product Measurement without unit only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','1234567890','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Measurement with unit only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.contains('option', 'Select Unit', { matchCase: false }).should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Short Description only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','This is a short description','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Description only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','This is a product description')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by triying to create a product filling up Supply Price only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('120','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product by filling up Retail Price only ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('{enter}','567')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Measuarement cannot be submited without Units ', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type('Product Measuarement cannot be submited without Units')
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('123')
    cy.expectedMessageCreateProduct('You selected an amount of measurement but did not enter an unit. Please provide a unit.')
  })

    it('Verify Units cannot be submited without Product Measuarement  ', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type('Product Measuarement cannot be submited without Units')
    cy.contains('option', 'Select Unit', { matchCase: false }).should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('You selected a unit of measurement but did not enter an amount. Please provide a quantity.')
  })

  it('Verify Product cannot be create when bar code is less than 12 digits ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and less than 12 digits Bar code','12345678901','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  
  it('Verify Product cannot be create when bar code is more than 12 digits ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901234','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product cannot be create when bar code is alphanumeric ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901a','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Supplier created from the Create product form ', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Supplier','{enter}','{enter}','{enter}','{enter}')
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Supplier').should('exist')
    cy.contains('label>span', 'Supplier').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Suppliers').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('label>span','Supplier Name', { matchCase: false }).parent().next('div').find('input').type('Automated Supplier', { force: true, delay: 50 })
    cy.contains('span','Supplier Description', { matchCase: false }).parent().next('div').find('textarea').eq(0).type('Automated Supplier', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Supplier created successfully', { matchCase: false }).should('exist')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  
  it('Verify brand name is required when creating a brand', () => {
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('Options').should('exist')
    cy.contains('Options').click({ force: true })
    cy.contains('li','Brand').should('exist') 
    cy.contains('li','Brand').click({ force: true })
    cy.get('section').next('div').find('button').click({ force: true })
    // cy.contains('span','Brand Name', { matchCase: false }).parent().next('div').find('input').type('', { force: true, delay: 50 })
    cy.contains('div>button','Save').click({ force: true })
    cy.contains('span', 'name must be a string' , { matchCase: false }).should('exist')
    cy.wait(2000)
    // cy.contains('button','Add new').click({ force: true })
    // cy.contains('button','Save').click({ force: true })
    // cy.contains('span', 'Category deleted', { matchCase: false }).should('exist')   
})

it('Verify category name is required when creating a category', () => {
  //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('Options').should('exist')
  cy.contains('Options').click({ force: true })
  cy.contains('li','Brand').should('exist') 
  cy.contains('li','Brand').click({ force: true })
  cy.get('section').next('div').find('button').click({ force: true })
  // cy.contains('span','Brand Name', { matchCase: false }).parent().next('div').find('input').type('', { force: true, delay: 50 })
  cy.contains('div>button','Save').click({ force: true })
  cy.contains('span', 'name must be a string' , { matchCase: false }).should('exist')
  cy.wait(2000)
  // cy.contains('button','Add new').click({ force: true })
  // cy.contains('button','Save').click({ force: true })
  // cy.contains('span', 'Category deleted', { matchCase: false }).should('exist')   
})

it('Verify bookr category is required when creating a category', () => {
  //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Products').should('exist')
  cy.contains('Products').click({ force: true })
  cy.contains('Options').should('exist')
  cy.contains('Options').click({ force: true })
  cy.contains('li','Brand').should('exist') 
  cy.contains('li','Brand').click({ force: true })
  cy.get('section').next('div').find('button').click({ force: true })
  // cy.contains('span','Brand Name', { matchCase: false }).parent().next('div').find('input').type('', { force: true, delay: 50 })
  cy.contains('div>button','Save').click({ force: true })
  cy.contains('span', 'name must be a string' , { matchCase: false }).should('exist')
  cy.wait(2000)
  // cy.contains('button','Add new').click({ force: true })
  // cy.contains('button','Save').click({ force: true })
  // cy.contains('span', 'Category deleted', { matchCase: false }).should('exist')   
})
})