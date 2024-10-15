/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randUsername1 = `teststf${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `teststf${faker.number.int({ min: 10, max: 100 })}`


const filloutProfileInfo = (first_name, last_name, email, order, username, password) => {
    cy.contains('span','First Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','First Name').parent().next('div').find('input').eq(0).type(first_name)
    cy.contains('span','Username').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Username').parent().next('div').find('input').eq(0).type(username)
    cy.contains('span','Password').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Password').parent().next('div').find('input').eq(0).type(password)
    cy.contains('span','Last Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Last Name').parent().next('div').find('input').eq(0).type(last_name)
    cy.contains('span','Email').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Email').parent().next('div').find('input').eq(0).type(email)
    cy.contains('span','Order').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Order').parent().next('div').find('input').eq(0).type(order)
}

const filloutServicesInfo =() =>{   
    cy.contains('div>button', 'Profile').scrollIntoView()
    cy.contains('div>button', 'Services').click({force: true})
    cy.contains('span','All services').parent('label').find('input').click({force:true})
}

const filloutCommissionsInfo =() =>{    
    cy.contains('div>button', 'Commissions').scrollIntoView()
    cy.contains('div>button', 'Commissions').click({force: true})
    cy.contains('label>span','Service').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Service').parent().next('div').find('input').eq(0).type('10')
}

const expectedMessageCreateEmployee = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
    cy.wait(300)
}

describe('Beta Vendor Admin | Employee | Create Employee| logged with Admin credentials', () => {

beforeEach(() => {
    cy.login('Admin Section', 'pinkdoor', '1234567890')
})

afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
})

it('Verify it is possible access to the Employee section- Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
})

// Add Employee Successfully


it.skip('Verify it is possible to add an Employee with role Readonly by filling up All the required info, selecting all services and adding ', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Receptionist')
    filloutServicesInfo()
    filloutCommissionsInfo()
    expectedMessageCreateEmployee('Employee created')
})

it.skip('Verify it is possible to add an Employee with role receptionist by filling up All the required info, selecting all services and adding ', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo(randUsername1, '{enter}', randEmail1, '{enter}', randUsername1, '1234567890')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Receptionist')
    filloutServicesInfo()
    filloutCommissionsInfo()
    expectedMessageCreateEmployee('Employee created')
})

it('Verify it is possible to add an Employee by filling up All the required info and selecting all services', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo(randUsername2, '{enter}', randEmail2, '{enter}', randUsername2, '1234567890')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    filloutServicesInfo()
    expectedMessageCreateEmployee('Employee created')
})

it.skip('Verify it is possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission level |username longer or equal to 3 characteres is required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo(randUsername3, '{enter}', '{enter}', '{enter}', randUsername2, '12345')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('Employee created')
})

// Add Employee Non-Successfully

it('Verify it is not possible to Add an Employee by filling up only the First Name, 4 character Username, 5 character Password and Permission level |username longer or equal to 3 characteres is required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo(randUsername2, '{enter}', '{enter}', '{enter}', randUsername2, '12345')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('Username already exist')
})

it('Verify it is not possible to Add an Employee by leaving all the fields empty, |First Name, username, Password and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    expectedMessageCreateEmployee('Please enter username')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name |username, Password and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the username |First Name, Password and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
        // filloutProfileInfo = (first_name, last_name, email, order, username, password)
    filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'stafftestbeta', '{enter}')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Password |First Name, Username and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
        // filloutProfileInfo = (first_name, last_name, email, order, username, password)
    filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    expectedMessageCreateEmployee('username is required')
})

it('Verify it is not possible to Add an Employee by filling up only the Permission Level |First Name, Username and Password are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('Please enter username')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name and Username | Password and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, and Password | Username and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    expectedMessageCreateEmployee('username is required')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, and Permission level | Username and Password are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', '{enter}', '{enter}')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Username and Password | First Name and Permission Level are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '1234567890')
    expectedMessageCreateEmployee('user.firstName must be longer than or equal to 1 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Username and Permission Level | First Name and Password are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', 'username10', '{enter}')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the Password and Permission Level | First Name and Username are required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    // filloutProfileInfo = (first_name, last_name, email, order, username, password)
    filloutProfileInfo('{enter}', '{enter}', '{enter}', '{enter}', '{enter}', '1234567890')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('user.username must be longer than or equal to 3 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, Username and Password |Permission Level is required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'stafftest', '1234567890')
    expectedMessageCreateEmployee('role must be one of the following values: staff, receptionist, readonly')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, 2 character Username, 5 character Password and Permission level |password must be longer or equal to 5 characteres is required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'st', '12345')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('user.username must be longer than or equal to 3 characters')
})

it('Verify it is not possible to Add an Employee by filling up only the First Name, 3 character Username, 4 character Password and Permission level |username must be longer or equal to 3 characteres is required|', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Employees').parent().next('div').find('button').eq(1).click({ force: true })
    filloutProfileInfo('first_name', '{enter}', '{enter}', '{enter}', 'sta', '1234')
    cy.contains('span','Permission level').parent().next('select').should('exist')
    cy.contains('span','Permission level').parent().next('select').select('Staff')
    expectedMessageCreateEmployee('user.password must be longer than or equal to 5 characters')
})

})