/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name, () => {
    cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.url().should('include', 'https://beta.vendor.bookr-dev.com/auth')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.xpath('//button[text()="Login"]').should('be.visible')
    cy.get('[type="text"]').type(username, { force: true, delay: 50 })
    cy.get('[type="password"]').type(password, { force: true, delay: 50 })
    cy.intercept('POST', '/api/main/auth/login').as('sign')
    cy.xpath('//button[text()="Login"]').click()
    cy.wait('@sign').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })
}

const accessToCreateSuppliers = () => {
  cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
  cy.contains('Inventory').should('exist')
  cy.contains('Inventory').click({ force: true })
  cy.contains('Suppliers').should('exist')
  cy.contains('Suppliers').click({ force: true })
  cy.contains('h6', 'Suppliers').should('exist')
  cy.contains('button', 'Add New').should('exist')
  cy.contains('button', 'Add New').click({ force: true })
  cy.contains('h3', 'Add New Supplier').should('exist')
}

const filloutSupplierForm = (sup_name, sup_description, sup_first_name, sup_last_name, sup_contact_mobile, sup_contact_email) => {
  cy.contains('h3', 'Add New Supplier').should('exist')
  cy.contains('h6', 'Supplier Details').should('exist')
  cy.contains('label>span', 'Supplier Name').should('exist')
  cy.contains('label>span', 'Supplier Name').parent().next('div').find('input').type(sup_name)
  cy.contains('label>span', 'Supplier Description').should('exist')
  cy.contains('label>span', 'Supplier Description').parent().next('div').find('textarea').first().type(sup_description)
  cy.contains('label>span', 'Contact First Name').should('exist')
  cy.contains('label>span', 'Contact First Name').parent().next('div').find('input').type(sup_first_name)
  cy.contains('label>span', 'Contact Last Name').should('exist')
  cy.contains('label>span', 'Contact Last Name').parent().next('div').find('input').type(sup_last_name)
  cy.contains('label>span', 'Contact Mobile').should('exist')
  cy.contains('label>span', 'Contact Mobile').parent().next('div').find('input').type(sup_contact_mobile)
  cy.contains('label>span', 'Contact email').should('exist')
  cy.contains('label>span', 'Contact email').parent().next('div').find('input').type(sup_contact_email)
}

const expectedMessageCreateSupplier = (supplier_message) => {
  cy.contains('button', 'Save').should('exist')
  cy.contains('button', 'Save').click()
  cy.contains('span', supplier_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Create Suppliers|logged with Admin credentials', () =>{

  beforeEach(() => {
    login('Admin Section', 'artnailcorner', '1234567890')
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is possible access to the Inventory/Suplliers section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Suppliers').should('exist')
    cy.contains('Suppliers').click({ force: true })
    cy.contains('h6', 'Suppliers').should('exist')
  })

  it('Verify the it is possible access to the Create Suppliers form - Admin credentials', () => {
    accessToCreateSuppliers()
  })

  //Unsuccessfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier leaving empty all the fields- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the supplier Description- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the Contact First Name- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','contact first name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the Contact Last Name- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','{enter}','contact last name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })
  
  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the Contact Mobile- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  
  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only email- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the Contact Mobile and email- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling all the form fiels exepct Supplliers name- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('{enter}','Suppliers description','contact fisrt name','contact last name','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  //Successfully suplier creation
  it('Verify suppliers Name is the required field by trying to add new supplier fiiling only the supplier name- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('Supplier with only supplier name filed out','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling up Supplier name and description inputs fields- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  
  

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling up Supplier name, description and contact first name inputs fields- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  

  it('Verify suppliers Name is the required field by trying to add new supplier fiiling up Supplier name, description, contact first name and last name inputs fields- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','Contact Last Name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier created successfully')
  })  
  it('Verify suppliers Name is the required field by trying to add new supplier fiiling all the inputs fields- Admin credentials', () => {
    accessToCreateSuppliers()
    filloutSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','Contact Last Name','38717494','3@gmail.com')
    expectedMessageCreateSupplier('Supplier created successfully')
  })

  //Delete suppliers

  it('Verify it is possible delete suplliers from the Inventory/Supplier list section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Supplier').should('exist')
    cy.contains('Supplier').click({ force: true })
    cy.contains('h6', 'Supplier').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Supplier Details').should('exist')
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this supplier?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this supplier?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Supplier deleted successfully').should('exist')
  })

  })
