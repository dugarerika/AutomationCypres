  /// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

// Important:  before running this test cases the product list must be empty

describe('Staging - Beta Vendor Admin | Inventory | Create products| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginprod('Admin Section', 'testsalon', 'testsalon1o')
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is possible access to the Inventory/Product section- Admin credentials', () => {
    cy.visit('https://vendor-beta.bookr.co/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
  })

  it('Verify the it is possible access to the Create product form - Admin credentials', () => {
    cy.accessToCreateProduct()
  })

//Navigation within the Creation Tabs
  it('Verify the it is possible access to the Create product/Basic info tab form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Basic Info').should('exist')
    cy.contains('button', 'Basic Info').click({ force: true })
    cy.contains('h6', 'Basic Info').should('exist')
    cy.contains('span', 'Product Name').should('exist')
    cy.contains('span', 'Product Bar Code').should('exist')
    cy.contains('span', 'Product Measurement').should('exist')
    cy.contains('span', 'Product Category').should('exist')
    cy.contains('span', 'Product Brand').should('exist')
    cy.contains('span', 'Short Description').should('exist')
    cy.contains('span', 'Product Description').should('exist')
  })

  it('Verify the it is possible access to the Create product/Pricing tab form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Pricing').should('exist')
    cy.contains('button', 'Pricing').click({ force: true })
    cy.contains('h6', 'Pricing').should('exist')
    cy.contains('span', 'Supply Price').should('exist')
    cy.contains('span', 'Retail Price').should('exist')
    cy.contains('span', 'Enable Retail Sales').should('exist')
  })

  it('Verify the it is possible access to the Create product/Inventory tab form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.contains('div>button','Inventory').should('exist')
    cy.contains('div>button','Inventory').click({ force: true })
    cy.contains('div>h6','Inventory').should('exist')
    // cy.contains('label/span','`SKU (Stock Keeping Unit)`').should('exist')
    cy.contains('span','Supplier').should('exist')
    // cy.contains('label/span','Current Stock Qantity').should('exist')
    // cy.contains('span','Low Stock Level').should('exist')
  })

  //Create succesfully
  it('Verify it is possible to create a Product by filling up only the Product Name - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name only','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product Bar Code - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789012','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product Measurement with Mililiter Unit - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with and Product Measurement with Mililiter Unit','{enter}','123','{enter}','{enter}')
    cy.contains('option', 'Select Unit').should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Category created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Product Category').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Category Name').parent().next('div').find('input').type('Automated Category', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Category created').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Category - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Category','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Product Category').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  
  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Brand created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Product Brand').should('exist')
    cy.contains('label>span', 'Product Brand').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span','Brand Name').parent().next('div').find('input').type('Automated Brand', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Brand created').should('exist')
    cy.contains('label>span', 'Product Category').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Categories').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Product Brand - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Brand','{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Product Brand').should('exist')
    cy.contains('label>span', 'Product Brand').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Brands').should('exist')
    cy.get('section>div>ul>*').first().click({ force: true })
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short description - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Short Description','{enter}','{enter}','This is a short description of the product','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Product description - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and Product Description','{enter}','{enter}','{enter}','This is a product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Short and product description - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name Short and product Description','{enter}','{enter}','This is a short description of the product','This is a product description of the product')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Supply Price - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Supply Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Retail Price - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('{enter}','6789')
    cy.filloutProductBasicInfo('Product filled up with Price name and Retail Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and SKU - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name and Low Stock Level - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('{enter}','{enter}','4','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price name and Low Stock Level','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code, short description, prod description and Reorder Quantity - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','90')
    cy.filloutProductBasicInfo('Product filled up with Price Name product bar code short description prod description and Reorder Quantity','098765432112','{enter}','Prod short description','Product description')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code EAN-13 4006381333931, and SKU12345-AB - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('SKU12345-AB','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 4006381333931 and SKU12345-AB','4006381333931','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, product bar code EAN-13 9780201379624, and SKU67890-CD  - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductInventoryInfo('SKU67890-CD','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 9780201379624 and SKU67890-CD','9780201379624','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Bar code EAN-13 5012345678900, SKU98765-GH, Retail Price and Supply Price  - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductInventoryInfo('SKU98765-GH','{enter}','{enter}','{enter}')
    cy.filloutProductBasicInfo('Product filled up with Price Name product barcode EAN-13 5012345678900 and SKU98765-GH','5012345678900','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

  it('Verify Product is create successfully by filling up Price Name, Supply Price and Retail Price- Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.filloutProductBasicInfo('Product filled up with Price name Supply & Retail Price','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })
  it('Verify Product is create successfully by filling up Price Name, Supply Price, Retail Price, and Enable Retails sales toogle switched ON- Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('12345','10')
    cy.wait(100)
    cy.contains('span','Enable Retail Sales').click({ force: true })
    cy.wait(100)
    cy.filloutProductBasicInfo('Product filled up with Price name Supply Retail Price tax & Enable Retails sales toggle switched ON','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

// Create Non successfully  

it('Verify it is no possible to create a Product by filling up Price Name and already added SKU - Admin credentials', () => {
  cy.accessToCreateProduct()
  cy.filloutProductInventoryInfo('asdf1234567','{enter}','{enter}','{enter}')
  cy.filloutProductBasicInfo('Product filled up with Price name and SKU','{enter}','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this SKU already exists')
})

it('Verify it is not possible to create a Product by filling up Price Name and already added Product Bar Code - Admin credentials', () => {
  cy.accessToCreateProduct()
  cy.filloutProductBasicInfo('Product filled up with Product Name and Bar code','123456789012','{enter}','{enter}','{enter}')
  cy.expectedMessageCreateProduct('Product with this Barcode already exists')
})

  it('Verify Product Name is the required field by trying to create a product leaving empty all the fields- Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by tring to create a product, filling up barcode only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','1234567890123','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product, filling up Product Measurement without unit only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','1234567890','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Measurement with unit only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','{enter}')
    cy.contains('option', 'Select Unit').should('exist')
    cy.get('select').select('l')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Short Description only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','This is a short description','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product filling up Product Description only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('{enter}','{enter}','{enter}','{enter}','This is a product description')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by triying to create a product filling up Supply Price only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('120','{enter}')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Name is the only required field by trying to create a product by filling up Retail Price only - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductPricingInfo('{enter}','567')
    cy.expectedMessageCreateProduct('Product name is required')
  })

  it('Verify Product Measuarement cannot be submited without Units - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.contains('button', 'Basic Info').should('exist')
    cy.contains('button', 'Basic Info').click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type('Product Measuarement cannot be submited without Units')
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('123')
    cy.expectedMessageCreateProduct('unit must be one of the following values: ml, l, g, kg, oz, lb, cm, ft, in, whole')
  })

  it('Verify Product cannot be create when bar code is less than 12 digits - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and less than 12 digits Bar code','12345678901','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  
  it('Verify Product cannot be create when bar code is more than 12 digits - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901234','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product cannot be create when bar code is alphanumeric - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Product Name and more than 12 digits Bar code','12345678901a','{enter}','{enter}','{enter}')
    cy.expectedMessageCreateProduct('Invalid Barcode, Barcodes must be 8, 12, or 13 digits long')
  })

  it('Verify Product is create successfully by filling up Price Name and Selecting a Supplier created from the Create product form - Admin credentials', () => {
    cy.accessToCreateProduct()
    cy.filloutProductBasicInfo('Product filled up with Price Name and Supplier','{enter}','{enter}','{enter}','{enter}')
    cy.filloutProductInventoryInfo('{enter}','{enter}','{enter}','{enter}')
    cy.contains('label>span', 'Supplier').should('exist')
    cy.contains('label>span', 'Supplier').parents('label').next('div').find('input').click({ force: true })
    cy.contains('h3', 'Suppliers').should('exist')
    cy.wait(2000)
    cy.get('section').next('div').find('button').click({ force: true })
    // cy.contains('h3','Create Supplier').should('exist')
    cy.contains('label>span','Supplier Name').parent().next('div').find('input').type('Automated Supplier', { force: true, delay: 50 })
    cy.contains('span','Supplier Description').parent().next('div').find('textarea').eq(0).type('Automated Supplier', { force: true, delay: 50 })
    cy.get('section').next('div').find('button').click({ force: true })
    cy.contains('span', 'Supplier created successfully').should('exist')
    cy.expectedMessageCreateProduct('Product created successfully')
  })

//Edit Successfully
  it.skip('Verify the option to edit production is available from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Edit').should('exist')
    cy.contains('button', 'Edit').click({ force: true })
    cy.contains('h3', 'Edit Product Details').should('exist')
  })

  it.skip('Verify it is not possible edit product messure without adding a unit from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Product Details').should('exist')
    cy.contains('button', 'Edit').should('exist')
    cy.contains('button', 'Edit').click({ force: true })
    cy.contains('h3', 'Edit Product Details').should('exist')
    cy.contains('button', 'Basic Info').should('exist')
    cy.contains('button', 'Basic Info').click({ force: true })
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type('1234567890')
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('span', 'measure.unit must be one of the following values: ml, l, g, kg, oz, lb, cm, ft, in, whole').should('exist')
    cy.wait(100)
  })

//Delete Successfully
  it.skip('Verify it is possible delete products from the Inventory/Product list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
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