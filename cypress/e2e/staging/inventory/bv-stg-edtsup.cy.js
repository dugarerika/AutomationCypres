/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const accessToEditSuppliers = () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Supplier').should('exist')
    cy.contains('Supplier').click({ force: true })
    cy.contains('h6', 'Supplier').should('exist')
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('h3', 'Supplier Details').should('exist')
    cy.contains('button', 'Edit').should('exist')
    cy.contains('button', 'Edit').click({ force: true })
    cy.contains('h6','Supplier Details').should('exist')

}

const filloutEditSupplierForm = (sup_name, sup_description, sup_first_name, sup_last_name, sup_contact_mobile, sup_contact_email) => {
    cy.contains('h3', 'Edit Supplier Details').should('exist')
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

const clearEditSupplierForm = () => {
    cy.contains('h3', 'Edit Supplier Details').should('exist')
    cy.contains('label>span', 'Supplier Description').should('exist')
    cy.contains('label>span', 'Supplier Description').parent().next('div').find('textarea').first().clear({ force: true })
    cy.contains('label>span', 'Contact First Name').should('exist')
    cy.contains('label>span', 'Contact First Name').parent().next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Contact Last Name').should('exist')
    cy.contains('label>span', 'Contact Last Name').parent().next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Contact Mobile').should('exist')
    cy.contains('label>span', 'Contact Mobile').parent().next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Contact email').should('exist')
    cy.contains('label>span', 'Contact email').parent().next('div').find('input').clear({ force: true })
    cy.contains('label>span', 'Supplier Name').should('exist')
    cy.contains('label>span', 'Supplier Name').parent().next('div').find('input').clear({ force: true })
}

const expectedMessageCreateSupplier = (supplier_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click()
    cy.wait(100)
    cy.contains('span', supplier_message).should('exist')
}

describe('Beta Vendor Admin | Inventory | Edit Suppliers|logged with Admin credentials', () =>{

  beforeEach(() => {
    cy.login('Admin Section', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify the it is possible access to the Edit Suppliers form - Admin credentials', () => {
    accessToEditSuppliers()
  })

  //Unsuccessfully suplier edit
  it('Verify suppliers Name is the required field by trying to edit new supplier leaving empty all the fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the supplier Description- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the Contact First Name- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','{enter}','contact first name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the Contact Last Name- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','{enter}','{enter}','contact last name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })
  
  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the Contact Mobile- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','{enter}')
    expectedMessageCreateSupplier('Supplier name is required')
  })


  it('Verify suppliers Name is the required field by trying to edit a supplier filling only email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','{enter}','{enter}','{enter}','{enter}','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the Contact Mobile and email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','{enter}','{enter}','{enter}','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  it('Verify suppliers Name is the required field by trying to edit a supplier filling all the form fiels exepct Supplliers name- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('{enter}','Suppliers description','contact fisrt name','contact last name','581199141','tests@gmail.com')
    expectedMessageCreateSupplier('Supplier name is required')
  })

  //Successfully suplier edit
  it('Verify suppliers Name is the required field by trying to edit a supplier filling only the supplier name- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier with only supplier name filed out','{enter}','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })

  it('Verify new supplier is added successfully by filling up Supplier name and description inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - description','Supplier Description','{enter}','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - description - contact first name','Supplier Description','contact First Name','{enter}','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - description - first name - last name','Supplier Description','contact First Name','Contact Last Name','{enter}','{enter}')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })  

  it('Verify new supplier is added successfully by filling up Supplier name, description, contact first name and last name inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - description - first name - last name - mobile','Supplier Description','contact First Name','Contact Last Name','38972467','{enter}')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })  

  it('Verify new supplier is added successfully by filling up all the inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier with all the fields fillout','Supplier Description','contact First Name','Contact Last Name','38717494','3@gmail.com')
    cy.wait(100)
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, last name, mobile and email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - last name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(100)
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - Contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    cy.wait(100)
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })


  it('Verify new supplier is added successfully by filling up Supplier name, description and contact first name inputs fields- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - contact Last Name - mobile - email','{enter}','{enter}','Contact Last Name','38972467','3@gmail.com')
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })  

  it('Verify new supplier is added successfully by filling up supplier name, mobile and email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - mobile - email','{enter}','{enter}','{enter}','38972467','3@gmail.com')
    cy.wait(100)
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })

  
  it('Verify new supplier is added successfully by filling up supplier name and email- Admin credentials', () => {
    accessToEditSuppliers()
    clearEditSupplierForm()
    filloutEditSupplierForm('Supplier name - email','{enter}','{enter}','{enter}','{enter}','3@gmail.com')
    cy.wait(100)
    expectedMessageCreateSupplier('Supplier Updated successfully')
  })
})
