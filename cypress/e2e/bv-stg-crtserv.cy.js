/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

const randEmail1 = faker.internet.email()
const randEmail2 = faker.internet.email()
const randUsername1 = `teststf${faker.number.int({ min: 10, max: 100 })}`
const randUsername2 = `teststf${faker.number.int({ min: 10, max: 100 })}`
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

const filloutServiceInfo = (first_name, last_name, email, order, username, password) => {
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

const accessToServiceSection = () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.contains('Services').should('exist')
    cy.contains('Services').click({ force: true })
    cy.contains('div','Services').should('exist')
    cy.contains('div','Services').click({ force: true })
}


const accessToAddServiceForm = () => {
    cy.contains('h6','Services').parent().next('div').find('button').eq(1).should('exist')
    cy.contains('h6','Services').parent().next('div').find('button').eq(1).click({ force: true })
    cy.contains('h3','Add a new service').should('exist')
}

const expectedMessageCreateService = (service_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', service_message).should('exist')
    cy.wait(300)
}

describe('Beta Vendor Admin | Services | Create Service| logged with Admin credentials', () => {

    beforeEach(() => {
        login('Admin Section', 'artnailcorner', '1234567890')
    })
    
    afterEach(() => {
        // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
        cy.clearCookies()
    })

    it('Verify it is possible access to the Service section- Admin credentials', () => {
        accessToServiceSection()
    })

    it('Verify It is possible access to the Add a New Service Form - Admin Credentila', () => {
        accessToServiceSection()
        accessToAddServiceForm()
    })

    it.only('Verify that at least 1 service variant is required - Admin Credentila', () => {
        accessToServiceSection()
        accessToAddServiceForm()
        expectedMessageCreateService('variants should not be empty')
    })

    it('Verify that service Name is required - Admin Credentila', () => {
        accessToServiceSection()
        accessToAddServiceForm
        expectedMessageCreateService('Service created')
    })


})