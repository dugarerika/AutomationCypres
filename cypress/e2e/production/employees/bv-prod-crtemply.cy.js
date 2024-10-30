/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randEmail3 = faker.internet.email()
const randUsername1 = `readonly${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `staff${faker.number.int({ min: 10, max: 100 })}`
const randUsername3 = `receptionist${faker.number.int({ min: 10, max: 100 })}`

describe('Beta Vendor Admin | Employee | Create Employee| logged with Admin credentials', () => {

    beforeEach(() => {
        cy.loginprod('Admin Section', 'testsalon', 'testsalon1o')
    })

afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
})

it.only('Verify it is possible access to the Employee section- Admin credentials', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
})

// Add Employee Successfully


it.only('Verify it is possible to add an Employee with role Readonly by filling up All the required info, selecting all services and adding ', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('Low')
    // cy.filloutServicesInfo()
    // cy.filloutCommissionsInfo()
    cy.expectedMessageCreateEmployee('Employee created')
})

it.only('Verify it is possible to add an Employee with role receptionist by filling up All the required info, selecting all services and adding ', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo(randUsername3, '{enter}', randEmail3, '{enter}', randUsername3, '1234567890')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('Medium')
    // cy.filloutServicesInfo()
    // cy.filloutCommissionsInfo()
    cy.expectedMessageCreateEmployee('Employee created')
})

it.only('Verify it is possible to add an Employee  with Role Staff by filling up All the required info and selecting all services', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo(randUsername2, '{enter}', randEmail2, '{enter}', randUsername2, '1234567890')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.filloutServicesInfo()
    cy.expectedMessageCreateEmployee('Employee created')
})

it.skip('Verify it is possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission Level |username longer or equal to 3 characteres is required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo(randUsername3, '{enter}', '{enter}', '{enter}', randUsername2, '12345')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('Employee created')
})

// Add Employee Non-Successfully

it('Verify it is not possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission Level |username longer or equal to 3 characteres is required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo(randUsername2, '{enter}', '{enter}', '{enter}', randUsername2, '12345')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('Username already exist')
})

it('Verify it is not possible to Add an Employee by leaving all the fields empty, |First Name, username, Password and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.expectedMessageCreateEmployee('Please enter username')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name |username, Password and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the username |First Name, Password and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
        // cy.filloutProfileInfo = (first_name, last_name, email, order, username, password)
    cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'stafftestbeta', '{enter}')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Password |First Name, Username and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
        // cy.filloutProfileInfo = (first_name, last_name, email, order, username, password)
    cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    cy.expectedMessageCreateEmployee('username is required')
})

it('Verify it is not possible to Add an Employee by filling up only the Permission Level |First Name, Username and Password are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('Please enter username')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name and Username | Password and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, and Password | Username and Permission Level are required|', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    cy.expectedMessageCreateEmployee('username is required')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, and Permission Level | Username and Password are required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Username and Password | First Name and Permission Level are required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '1234567890')
    cy.expectedMessageCreateEmployee('user.firstName must be longer than or equal to 1 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Username and Permission Level | First Name and Password are required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Password and Permission Level | First Name and Username are required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    // cy.filloutProfileInfo = (first_name, last_name, email, order, username, password)
    cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('user.username must be longer than or equal to 3 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, Username and Password |Permission Level is required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'stafftest', '1234567890')
    cy.expectedMessageCreateEmployee('role must be one of the following values: staff, receptionist, readonly')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, 2 character Username, 5 character Password and Permission Level |password must be longer or equal to 5 characteres is required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'st', '12345')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('user.username must be longer than or equal to 3 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, 3 character Username, 4 character Password and Permission Level |username must be longer or equal to 3 characteres is required|', () => {

    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'sta', '1234')
    cy.contains('span','Permission Level').parent().next('select').should('exist')
    cy.contains('span','Permission Level').parent().next('select').select('High')
    cy.expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

})