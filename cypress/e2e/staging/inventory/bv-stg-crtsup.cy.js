/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const expectedMessageCreateSupplier = (supplier_message) => {
  cy.contains('button', 'Save').should('exist')
  cy.contains('button', 'Save').click()
  cy.wait(80)
  cy.contains('span', supplier_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Create Suppliers|logged with Admin credentials', () =>{

  beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor0_Admin_Username_Staging"), Cypress.env("Vendor0_Admin_Password_Staging"))
        // cy.contains('h3','Welcome Back!').next('button').click()
    cy.get('body').then(($body) => {
        if ($body.text().includes('Welcome Back!')) {
            cy.contains('h3', 'Welcome Back!').next('button').click()
            cy.wait(80)
        }
    })
    cy.wait(80)
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is possible access to the Inventory/Suplliers section- Admin credentials', () => {
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.visit(Cypress.env("URL_Staging") + 'admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Suppliers').should('exist')
    cy.contains('Suppliers').click({ force: true })
    cy.contains('h6', 'Suppliers').should('exist')
  })

  it('Verify the it is possible access to the Create Suppliers form - Admin credentials', () => {
    cy.accessToCreateSuppliers()
  })

  //Unsuccessfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier leaving empty all the fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the supplier Description- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact First Name- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','contact first name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Last Name- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','contact last name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })
  
  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Mobile- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  
  it('Verify suppliers Name is the required field by trying to add new supplier filling only email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Mobile and email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling all the form fiels exepct Supplliers name- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('{enter}','Suppliers description','contact fisrt name','contact last name','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  //Successfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier filling only the supplier name- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier with only supplier name filed out','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up Supplier name and description inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - description','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - description - contact first name','Supplier Description','contact First Name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - description - first name - last name','Supplier Description','contact First Name','Contact Last Name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - description - first name - last name - mobile','Supplier Description','contact First Name','Contact Last Name','38972467','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up all the inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','Contact Last Name','38717494','3@gmail.com')
    cy.wait(80)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, last name, mobile and email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - last name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(80)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - Contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(80)
    expectedMessageCreateSupplier('Supplier created successfully')
  })


  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - mobile - email','{enter}','{enter}','{enter}','38972467','3@gmail.com')
    cy.wait(80)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  
  it('Verify new supplier is added successfully by filling up supplier name and email- Admin credentials', () => {
    cy.accessToCreateSuppliers()
    cy.filloutSupplierForm('Supplier name - email','{enter}','{enter}','{enter}','{enter}','3@gmail.com')
    cy.wait(80)
    expectedMessageCreateSupplier('Supplier created successfully')
  })
})
