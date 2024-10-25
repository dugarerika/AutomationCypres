/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth')
    cy.wait(900)
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.xpath('//button[text()="Sign in"]').should('be.visible');
    cy.get('#username').click().type(username, {force: true, delay: 80})
    cy.get('#password').click().type(password,{force: true, delay: 80})
    cy.intercept('POST', '/ssr/main/api/auth/login').as('sign')
    cy.get('button').contains('Sign in').click()
    cy.wait(100)
    cy.wait('@sign').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })          
  })
}
 
const searchApt = (staff, start_time) => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
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
describe('Vendor Admin | Calendar |Edit appointments by Clicking on appointnment at the calendar| logged with Staff credentials', () => {

  beforeEach(() => {
    login('Staff Session', 'zumba','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

//   it('Verify it is possible to edit an new appointment for 1 service and 1 offer - Staff credentials', () => {
//     searchApt('Zumba Zumba','08:00')  
//     cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
//     cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
//     cy.contains('Add New Item').should('exist')  
//     cy.contains('Add New Item').click()
//     cy.contains('Add Offer').should('exist')  
//     cy.contains('Add Offer').click()
//     cy.contains('div','Offer').should('exist')  
//     cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
//     cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{enter}')
//     cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
//     cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
//     cy.contains('Create Appointment').click({force: true})
//     cy.wait('@new-user').then((interception) => {
//       expect(interception.response.statusCode).to.equal(200)
//     })
//     cy.contains('New Appointment').should('not.be.visible')  
//   }) 


})

describe('Vendor Admin | Calendar | Edit appointments by Clicking on appointment at the calendar| logged with Admin credentials', () => {

  beforeEach(() => {
    login('Admin Section', 'artnailcorner','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button - Admin credentials', () => {
    searchApt('Marly william','07:00') 
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
  })

  it('Verify it is possible to edit the Customer - Admin credentials', () => {
    searchApt('Marly william','07:00') 
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.wait(1000)
  })
})

describe('Vendor Admin | Calendar | Edit appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

  beforeEach(() => {
    login('Receptionist Session', 'recep6','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button  - Receptionist credentials', () => {
    searchApt('Marly william','06:00') 
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.log('Test completed')
  })

  it('Verify it is possible to edit the Customer  - Receptionist credentials', () => {
    searchApt('Marly william','06:00') 
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.log('Test completed')
  })
})

describe('Vendor Admin | Calendar| Edit appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    login('Readonly Session', 'readonly3','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to edit an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    searchApt('Marly william','07:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })

  it('Verify it is not possible to edit an new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchApt('Marly william','07:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
    }) 
    
  
  })