/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randEmail3 = faker.internet.email()
const randEmail4 = faker.internet.email()
const randUsername1 = `${faker.person.firstName()}testnai${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `${faker.person.firstName()}sttest${faker.number.int({ min: 10, max: 100 })}`
const randUsername3 = `${faker.person.firstName()}sttest${faker.number.int({ min: 10, max: 100 })}`
const randUsername4 = `${faker.person.firstName()}sttest${faker.number.int({ min: 10, max: 100 })}`

const employeeSection = () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('li>button','All Employees').should('exist')
    cy.contains('li>button','All Employees').click({ force: true })
}

describe('Beta Vendor Admin | Employee | Create Employee| logged with Admin credentials', () => {

    beforeEach(() => {
        cy.login('Admin Section', Cypress.env("Vendor0_Admin_Username_Staging"), Cypress.env("Vendor0_Admin_Password_Staging"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify it is possible access to the Employee section- Admin credentials', () => {
        employeeSection()
    })

// Add Employee Successfully
// LOW Permission Level
    it('Verify it is possible to add an Employee with role Readonly by filling up All the required info, selecting all services and adding ', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('Low')
        cy.selectAllServices()

        cy.expectedMessageCreateEmployee('Employee created')
    })

    // MEDIUM Permission Level
    it('Verify it is possible to add an Employee with role receptionist(Medium Permission Level) by filling up All the required info, selecting all services and adding ', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername3, '{enter}', randEmail1, '{enter}', randUsername3, '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('Medium')
        cy.selectAllServices()
        cy.expectedMessageCreateEmployee('Employee created')
    })

// HIGH Permission Level
    it('Verify it is possible to add an Employee by filling up All the required info and selecting all services', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername2, '{enter}', randEmail2, '{enter}', randUsername2, '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.selectAllServices()
        cy.filloutCommissionsInfo()
        cy.expectedMessageCreateEmployee('Employee created')
    })

    it('Verify it is possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission Level |username longer or equal to 3 characteres is required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername4, '{enter}', '{enter}', '{enter}', randUsername4, '12345')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('Employee created')
    })

// Add Employee Non-Successfully

    it('Verify it is not possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission Level |username longer or equal to 3 characteres is required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo(randUsername2, '{enter}', '{enter}', '{enter}', randUsername2, '12345')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('Username already exist')
    })

    it('Verify it is not possible to Add an Employee by leaving all the fields empty, |First Name, username, Password and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.expectedMessageCreateEmployee('Please enter username')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name |username, Password and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters')
    })

    it('Verify it is not possible to Add an Employee by filling up only the username |First Name, Password and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'Hightestbeta', '{enter}')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters')
    })

    it('Verify it is not possible to Add an Employee by filling up only the Password |First Name, Username and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
        cy.expectedMessageCreateEmployee('Username is required Please enter a valid username First name is required firstName must be a string Please Select a Permission Level for the employee')
    })

    it('Verify it is not possible to Add an Employee by filling up only the Permission Level |First Name, Username and Password are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('Please enter username')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name and Username | Password and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name, and Password | Username and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
        cy.expectedMessageCreateEmployee('Username is required Please enter a valid username Please Select a Permission Level for the employee')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name, and Permission Level | Username and Password are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters password must be a string Username is required')
    })

    it('Verify it is not possible to Add an Employee by filling up only the Username and Password | First Name and Permission Level are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '1234567890')
        cy.expectedMessageCreateEmployee('First name is required firstName must be a string Please Select a Permission Level for the employee')
    })

    it('Verify it is not possible to Add an Employee by filling up only the Username and Permission Level | First Name and Password are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters password must be a string First name is required firstName must be a string')})

    it('Verify it is not possible to Add an Employee by filling up only the Password and Permission Level | First Name and Username are required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('Username is required Please enter a valid username First name is required firstName must be a string')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name, Username and Password |Permission Level is required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'Hightest', '1234567890')
        cy.expectedMessageCreateEmployee('Please Select a Permission Level for the employee')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name, 2 character Username, 5 character Password and Permission Level |password must be longer or equal to 5 characteres is required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'st', '12345')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('Username must be at least 3 characters')
    })

    it('Verify it is not possible to Add an Employee by filling up only the First Name, 3 character Username, 4 character Password and Permission Level |username must be longer or equal to 3 characteres is required|', () => {
        employeeSection()
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).should('exist')
        cy.contains('h6','employees', { matchCase: false }).parent().next('div').find('button').eq(1).click({ force: true })
        cy.filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'sta', '1234')
        cy.contains('span','Permission Level').parent().next('select').should('exist')
        cy.contains('span','Permission Level').parent().next('select').select('High')
        cy.expectedMessageCreateEmployee('password must be longer than or equal to 5 characters')
    })
})