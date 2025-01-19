/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

const accessToEditProduct = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging"))
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.wait(100)
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').should('exist')
    cy.get('div[row-id="0"]').find('div[col-id="category.name"]').click({ force: true })
    cy.wait(100)
    cy.contains('h3', 'Product Details', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).click({ force: true })
}

const clearProductBasicInfo = () => {
    cy.contains('button', 'Edit', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').clear({ force: true })
    cy.get('input[placeholder="Enter product barcode e.g 123456789"]').should('exist')
    cy.get('input[placeholder="Enter product barcode e.g 123456789"]').clear({ force: true })
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').clear({ force: true })
    cy.get('input[placeholder="Enter short description of the product"]').should('exist')
    cy.get('input[placeholder="Enter short description of the product"]').clear({ force: true })
    cy.get('textarea[placeholder="Enter product description"]').should('exist')
    cy.get('textarea[placeholder="Enter product description"]').clear({ force: true })
}

const clearProductPricingInfo = () =>{
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Retail Price', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Supply Price', { matchCase: false }).parents('label').next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Supply Price', { matchCase: false }).parents('label').next('div').find('input').type('0')
    cy.contains('label>span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Retail Price', { matchCase: false }).parents('label').next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Retail Price', { matchCase: false }).parents('label').next('div').find('input').type('0')
    cy.contains('span', 'Enable Retail Sales', { matchCase: false }).should('exist')
    cy.contains('span', 'Tax', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).click({ force: true })
    
}

const filloutProductBasicInfo = (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
  cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
  cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
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
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Retail Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Enable Retail Sales', { matchCase: false }).should('exist')
    cy.contains('span', 'Tax', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Supply Price', { matchCase: false }).parents('label').next('div').find('input').type(prod_supply_price)
    cy.contains('label>span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Retail Price', { matchCase: false }).parents('label').next('div').find('input').type(prod_retail_price)
}

const filloutProductInventoryInfo =(prod_ksu, prod_stock_qty, prod_low_stock_lvl, prod_reorder_qty) =>{
  cy.contains('div>button', 'Inventory', { matchCase: false }).should('exist')
  cy.contains('div>button', 'Inventory', { matchCase: false }).click({ force: true })
  cy.contains('h6', 'Inventory', { matchCase: false }).should('exist')
  cy.contains('span', 'Track Stock Quantity', { matchCase: false }).should('exist')
  cy.contains('span', 'Receive Low Stock Notifications', { matchCase: false }).should('exist')
  cy.contains('label>span', 'SKU (Stock Keeping Unit)', { matchCase: false }).should('exist')
  cy.contains('label>span', 'SKU (Stock Keeping Unit)', { matchCase: false }).parents('label').next('div').find('input').type(prod_ksu)
  cy.contains('label>span', 'Current Stock Quantity', { matchCase: false }).should('exist')
  cy.contains('label>span', 'Current Stock Quantity', { matchCase: false }).parents('label').next('div').find('input').type(prod_stock_qty)
  cy.contains('label>span', 'Low Stock Level', { matchCase: false }).should('exist')
  cy.contains('label>span', 'Low Stock Level', { matchCase: false }).parents('label').next('div').find('input').type(prod_low_stock_lvl)
  cy.contains('label>span', 'Reorder Quantity', { matchCase: false }).should('exist')
  cy.contains('label>span', 'Reorder Quantity', { matchCase: false }).parents('label').next('div').find('input').type(prod_reorder_qty)

}

const expectedMessageCreateProduct = (product_message) => {
    cy.contains('button', 'Save', { matchCase: false }).should('exist')
    cy.contains('button', 'Save', { matchCase: false }).click({ force: true })
    cy.contains('span', product_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Edit products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify the it is possible access to the Edit product form - Admin credentials', () => {
    accessToEditProduct()
  })

//Navigation within the Creation Tabs
  it('Verify the it is possible access to the Edit product/Basic info tab form - Admin credentials', () => {
    accessToEditProduct()
    clearProductBasicInfo()
  })

  //Create succesfully
  it.only('Verify it is possible to create a Product by filling up only the Product Name - Admin credentials', () => {
    accessToEditProduct()
    clearProductBasicInfo()
    filloutProductBasicInfo('Product filled up with Product Name only edited','{enter}','{enter}','{enter}','{enter}')
    clearProductPricingInfo()
    expectedMessageCreateProduct('Product Updated successfully')
    cy.wait(100)
  })

  it.only('Verify Product is create successfully by filling up Price Name and Product Bar Code - Admin credentials', () => {
    accessToEditProduct()
    clearProductBasicInfo()
    filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789020','{enter}','{enter}','{enter}')
    clearProductPricingInfo()
    expectedMessageCreateProduct('Product Updated successfully')
    cy.wait(100)
  })

  it.only('Verify Product is create successfully by filling up Price Name and Product Measurement with Mililiter Unit - Admin credentials', () => {
    accessToEditProduct()
    clearProductBasicInfo()
    filloutProductBasicInfo('Product filled up with and Product Measurement with Mililiter Unit','{enter}','123','{enter}','{enter}')
    cy.contains('option', 'Select Unit', { matchCase: false }).should('exist')
    cy.get('select').select('l')
    clearProductPricingInfo()
    expectedMessageCreateProduct('Product Updated successfully')
    cy.wait(100)
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Category created from the Create product form - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name', { matchCase: false }).parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Category - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Category', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    expectedMessageCreateProduct('Product created successfully')
  })
  
  it('Verify Product is create successfully by filling up Price Name and Selecting a Brand created from the Create product form - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Brand', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands', { matchCase: false }).should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Brand Name', { matchCase: false }).parent().next('div').find('input').type('Automated Brand', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Brand created', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Category', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Brand - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Brand', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Brand', { matchCase: false }).parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands', { matchCase: false }).should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short description - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name and Short Description','{enter}','{enter}','This is a short description of the product','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product description - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name and Product Description','{enter}','{enter}','{enter}','This is a product description of the product')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short and product description - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name Short and product Description','{enter}','{enter}','This is a short description of the product','This is a product description of the product')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Supply Price - Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('12345','{enter}')
    filloutProductBasicInfo('Product filled up with Price name and Supply Price','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Retail Price - Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('{enter}','6789')
    filloutProductBasicInfo('Product filled up with Price name and Retail Price','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and SKU - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
    filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Current Stock Quantity - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('{enter}','3','{enter}','{enter}')
    filloutProductBasicInfo('Product filled up with Price name and Current Stock Quantity','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Low Stock Level - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('{enter}','{enter}','4','{enter}')
    filloutProductBasicInfo('Product filled up with Price name and Low Stock Level','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  
  it('Verify Product is create successfully by filling up Price Name and Reorder Quantity - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('{enter}','{enter}','{enter}','90')
    filloutProductBasicInfo('Product filled up with Price name and Reorder Quantity','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code, short description, prod description and Reorder Quantity - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('{enter}','{enter}','{enter}','90')
    filloutProductBasicInfo('Product filled up with Price Name product bar code short description prod description and Reorder Quantity','098765432112','{enter}','Prod short description','Product description')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code EAN-13 4006381333931, and SKU12345-AB - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('SKU12345-AB','{enter}','{enter}','{enter}')
    filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 4006381333931 and SKU12345-AB','4006381333931','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code EAN-13 9780201379624, and SKU67890-CD  - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('SKU67890-CD','{enter}','{enter}','{enter}')
    filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 9780201379624 and SKU67890-CD','9780201379624','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code EAN-13 5012345678900, and SKU98765-GH  - Admin credentials', () => {
    accessToEditProduct()
    filloutProductInventoryInfo('SKU98765-GH','{enter}','{enter}','{enter}')
    filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 5012345678900 and SKU98765-GH','5012345678900','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price and Retail Price- Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('12345','10')
    filloutProductBasicInfo('Product filled up with Price name Supply & Retail Price','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })
  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price and tax toogle switched ON- Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('12345','10')
    cy.contains('span','Tax', { matchCase: false }).click({ force: true })
    filloutProductBasicInfo('Product filled up with Price name Supply Retail Price and tax toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price, Tax and Enable Retails sales toogle switched ON- Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('12345','10')
    cy.contains('span','Tax', { matchCase: false }).click({ force: true })
    cy.wait(100)
    cy.contains('span','Enable Retail Sale', { matchCase: false }).click({ force: true })
    cy.wait(100)
    filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax & Enable Retails sales toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product created successfully')
  })

// Create Non successfully  
it('Verify it is no possible to create a Product by filling up Price Name and already added SKU - Admin credentials', () => {
  accessToEditProduct()
  filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
  filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
  expectedMessageCreateProduct('Failed to create product')
})

it('Verify it is not possible to create a Product by filling up Price Name and already added Product Bar Code - Admin credentials', () => {
  accessToEditProduct()
  filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789012','{enter}','{enter}','{enter}')
  expectedMessageCreateProduct('Failed to create product')
})

  it('Verify Product Name is the required field by trying to create a product leaving empty all the fields- Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by tring to create a product, filling up barcode only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','1234567890123','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product, filling up Product Measurement without unit only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','{enter}','1234567890','{enter}','{enter}')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Measurement with unit only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.contains('option', 'Select Unit', { matchCase: false }).should('exist')
    cy.get('select').select('l')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Short Description only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','{enter}','{enter}','This is a short description','{enter}')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Description only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','This is a product description')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by triying to create a product filling up Supply Price only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('120','{enter}')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product by filling up Retail Price only - Admin credentials', () => {
    accessToEditProduct()
    filloutProductPricingInfo('{enter}','567')
    expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Measuarement cannot be submited without Units - Admin credentials', () => {
    accessToEditProduct()
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type('Product Measuarement cannot be submited without Units')
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('123')
    expectedMessageCreateProduct('measure.unit must be one of the following values: ml, l, g, kg, oz, lb, cm, ft, in, whole')
  })

  it('Verify Product cannot be create when bar code is less than 12 digits - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name and less than 12 digits Bar code','12345678901','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Failed to create product')
  })

  
  it('Verify Product cannot be create when bar code is more than 12 digits - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901234','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Failed to create product')
  })

  it('Verify Product cannot be create when bar code is alphanumeric - Admin credentials', () => {
    accessToEditProduct()
    filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901a','{enter}','{enter}','{enter}')
    expectedMessageCreateProduct('Failed to create product')
  })


//Edit Successfully
  it.skip('Verify the option to edit production is available from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Product details', { matchCase: false }).should('exist')
  })

  it.skip('Verify it is not possible edit product messure without adding a unit from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).should('exist')
    cy.contains('button', 'Edit', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Product details', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('1234567890')
    cy.contains('button', 'Save', { matchCase: false }).should('exist')
    cy.contains('button', 'Save', { matchCase: false }).click({ force: true })
    cy.contains('span', 'measure.unit must be one of the following values: ml, l, g, kg, oz, lb, cm, ft, in, whole').should('exist')
    cy.wait(100)
  })

})