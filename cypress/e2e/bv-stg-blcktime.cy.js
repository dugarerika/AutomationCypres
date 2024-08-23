/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
    cy.session(name,() => {
    cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.url().should('include', 'https://beta.vendor.bookr-dev.com/auth')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.xpath('//button[text()="Login"]').should('be.visible')
    cy.get('[type="text"]').type(username, {force: true, delay: 50})
    cy.get('[type="password"]').type(password,{force: true, delay: 50})
    cy.intercept('POST', '/api/main/auth/login').as('sign')
    cy.xpath('//button[text()="Login"]').click()
    cy.wait('@sign').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })          
    })
}

const searchTimeSlot = (staff,start_time) => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let color
    cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
        cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
}

const searchApt = (staff,start_time) => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let color
    cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
        cy.log('Test completed')
    })
    cy.contains('Appointment Details').should('be.visible')
}

describe('Beta Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Admin Credentials', () => {

    beforeEach(() => {
        login('Admin Section', 'testsalon','testsalon1o')
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it.only('Verify Start time is required to create a blocktime on the Calendar  - Admin credentials', () => {
        cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.wait(1000)
        cy.contains('li','New Block Time').should('be.visible')
        cy.contains('li','New Block Time').click({force: true})
        cy.contains('div>h3','Create Block Time').should('be.visible')
        cy.contains('div>h3','Create Block Time').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('nao{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it.only('Verify Start time is required to create a blocktime on the Calendar  - Admin credentials', () => {
        cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.wait(1000)
        cy.contains('li','New Block Time').should('be.visible')
        cy.contains('li','New Block Time').click({force: true})
        cy.contains('div>h3','Create Block Time').should('be.visible')
        cy.contains('div>h3','Create Block Time').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('nao{enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{enter}{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','End time cannot be empty').should('be.visible')
    })

    it.only('Verify Start time is required to create a blocktime on the Calendar  - Admin credentials', () => {
        cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.wait(1000)
        cy.contains('li','New Block Time').should('be.visible')
        cy.contains('li','New Block Time').click({force: true})
        cy.contains('div>h3','Create Block Time').should('be.visible')
        cy.contains('div>h3','Create Block Time').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('naomi{enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{enter}{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','End time cannot be empty').should('be.visible')
    })


    it('It is possible to edit a blocktime on the calendar - Admin credentials', () => {
    })

    it('It is possible to delete a blocktime on the calendar - Admin credentials', () => {
    })
})