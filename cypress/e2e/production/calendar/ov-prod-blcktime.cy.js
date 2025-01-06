/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const newBlockTime = () => {
    cy.visit(Cypress.env("URL_OldVendor_Production"))
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(1000)
    cy.contains('li','New Block Time').should('be.visible')
    cy.contains('li','New Block Time').click({force: true})
    cy.contains('div>h3','New Blocked Time').should('be.visible')
    cy.contains('div>h3','New Blocked Time').click({force: true})
  }
describe('Production - Old Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Admin Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })

    beforeEach(() => {
        cy.loginovprd('Admin Section', Cypress.env("Vendor_Admin_Username_Production"), Cypress.env("Vendor_Admin_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify Start time is required to create a blocktime on the Calendar  - Admin credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it('Verify End time is required to create a blocktime on the Calendar  - Admin credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{enter}{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','End time cannot be empty').should('be.visible')
    })

    it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar  - Admin credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked times start and end time are invalid').should('be.visible')
    })

    it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields - Admin credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('01:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked Time Created').should('be.visible')
    })

    it('Verify it is possible to edit staff on a blocktime from the Calendar - Admin credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Set {enter}')
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit Start time on a blocktime from the Calendar - Admin credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit End time on a blocktime from the Calendar - Admin credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to delete a blocktime from the Calendar - Admin credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('button','Delete').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })
})

describe('Production - Old Vendor Staff | Calendar| Create Blocktime on the Calendar | logged with Staff Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })

    beforeEach(() => {
        cy.loginovprd('Staff Section', Cypress.env("Vendor_Staff_Username_Production"), Cypress.env("Vendor_Staff_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify Start time is required to create a blocktime on the Calendar  - Staff credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Zumba Zumba{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it('Verify End time is required to create a blocktime on the Calendar  - Staff credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Zumba Zumba{enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{enter}{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','End time cannot be empty').should('be.visible')
    })

    it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar  - Staff credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Zumba Zumba{enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked times start and end time are invalid').should('be.visible')
    })

    it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields - Staff credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Zumba Zumba{enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('01:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked Time Created').should('be.visible')
    })

    it('Verify it is possible to edit staff on a blocktime from the Calendar - Staff credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Zumba Zumba').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Set {enter}')
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit Start time on a blocktime from the Calendar - Staff credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Zumba Zumba').click({force: true})
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit End time on a blocktime from the Calendar - Staff credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Zumba Zumba').click({force: true})
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to delete a blocktime from the Calendar - Staff credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Zumba Zumba').click({force: true})
        cy.contains('button','Delete').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })
})

describe('Production - Old Vendor Receptionist | Calendar| Create Blocktime on the Calendar | logged with Receptionist Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })

    beforeEach(() => {
        cy.loginovprd('Receptionist Section', Cypress.env("Vendor_Receptionist_Username_Production"), Cypress.env("Vendor_Receptionist_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify Start time is required to create a blocktime on the Calendar  - Receptionist credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Start time cannot be empty').should('be.visible')
    })

    it('Verify End time is required to create a blocktime on the Calendar  - Receptionist credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{enter}{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','End time cannot be empty').should('be.visible')
    })

    it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar  - Receptionist credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked times start and end time are invalid').should('be.visible')
    })

    it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields - Receptionist credentials', () => {
        newBlockTime()
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('01:00{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('03:00{enter}')
        cy.contains('button','Submit').click({force: true})
        cy.contains('div>span','Blocked Time Created').should('be.visible')
    })

    it('Verify it is possible to edit staff on a blocktime from the Calendar - Receptionist credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
        cy.contains('div','Choose a staff').next('div').find('input').click().type('Set {enter}')
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit Start time on a blocktime from the Calendar - Receptionist credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('span','Start Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','Start Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to edit End time on a blocktime from the Calendar - Receptionist credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('span','End Time').parent().next('div').find('input').should('be.visible')
        cy.contains('span','End Time').parent().next('div').find('input').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
        cy.wait(1000)
        cy.contains('button','Update').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })

    it('Verify it is possible to delete a blocktime from the Calendar - Receptionist credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('span', 'Block Time for').next('span','Helen').click({force: true})
        cy.contains('button','Delete').click({force: true})
        cy.contains('div>span','Employee Blocktime updated successfully').should('be.visible')
    })
})

describe('Production - Old Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with ReadOnly Credentials', () => {

    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearAllSavedSessions)
    })

    beforeEach(() => {
        cy.loginovprd('ReadOnly Section', Cypress.env("Vendor_ReadOnly_Username_Production"), Cypress.env("Vendor_ReadOnly_Password_Production"))
    })

    afterEach(() => {
        cy.clearCookies()
    })

    it('Verify Start time is required to create a blocktime on the Calendar  - ReadOnly credentials', () => {
        cy.visit(Cypress.env("URL_OldVendor_Production"))
        cy.contains('button','Add New').should('be.visible')
        cy.contains('button','Add New').click({force: true})
        cy.wait(1000)
        cy.contains('li','New Block Time').should('not.exist')
    })
})