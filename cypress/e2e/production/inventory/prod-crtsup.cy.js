/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const expectedMessageCreateSupplier = (supplier_message) => {
  cy.contains('button', 'Save').should('exist')
  cy.contains('button', 'Save').click()
  cy.wait(64)
  cy.contains('span', supplier_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Create Suppliers|logged with Admin credentials', () =>{

  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearAllSavedSessions)
  }) 

  beforeEach(() => {
    cy.loginprod('Admin Section', Cypress.expose("Vendor_Admin_Username_Production"), Cypress.expose("Vendor_Admin_Password_Production"))
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is possible access to the Inventory/Suplliers section', () => {
    cy.visit(Cypress.expose("URL_Production") + 'admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Suppliers').should('exist')
    cy.contains('Suppliers').click({ force: true })
    cy.contains('h6', 'Suppliers').should('exist')
  })

  it('Verify the it is possible access to the Create Suppliers form ', () => {
    cy.accessToCreateSuppliers('URL_Production')
  })

  //Unsuccessfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier leaving empty all the fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the supplier Description', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact First Name', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','contact first name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Last Name', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','contact last name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })
  
  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Mobile', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  
  it('Verify suppliers Name is the required field by trying to add new supplier filling only email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling only the Contact Mobile and email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier filling all the form fiels exepct Supplliers name', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('{enter}','Suppliers description','contact fisrt name','contact last name','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  //Successfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier filling only the supplier name', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier with only supplier name filed out','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up Supplier name and description inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - description','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - description - contact first name','Supplier Description','contact First Name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - description - first name - last name','Supplier Description','contact First Name','Contact Last Name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - description - first name - last name - mobile','Supplier Description','contact First Name','Contact Last Name','38972467','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up all the inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','Contact Last Name','38717494','3@gmail.com')
    cy.wait(64)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, last name, mobile and email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - last name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(64)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - Contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(64)
    expectedMessageCreateSupplier('Supplier created successfully')
  })


  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - mobile - email','{enter}','{enter}','{enter}','38972467','3@gmail.com')
    cy.wait(64)
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  
  it('Verify new supplier is added successfully by filling up supplier name and email', () => {
    cy.accessToCreateSuppliers('URL_Production')
    cy.filloutSupplierForm('Supplier name - email','{enter}','{enter}','{enter}','{enter}','3@gmail.com')
    cy.wait(64)
    expectedMessageCreateSupplier('Supplier created successfully')
  })
})
