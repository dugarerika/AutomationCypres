/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const loginDeeplink = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://stg.customer.bookr-dev.com/auth')
    cy.url().should('include', 'https://stg.customer.bookr-dev.com/auth')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.xpath('//button[text()="Login"]').should('be.visible')
    cy.get('[type="text"]').type(username, {force: true, delay: 50})
    cy.get('[type="password"]').type(password,{force: true, delay: 50})
    cy.intercept('POST', '/gateway/api/auth/login').as('sign')
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

describe('Beta Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    loginDeeplink('User Section', 'dugarerika@gmail.com','1234567890')
    cy.visit('https://stg.customer.bookr-dev.com/vendors/athary-world-nail-')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment for service to pay at salon  - Readonly credentials', () => {

    // searchTimeSlot('Naomi ','08:00')
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    // cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
    cy.contains('button>span','Services').click({force: true})
    // cy.contains('button>span','Offers').click({force: true})
    cy.contains('div>button','At Vendor').click({force: true})
    cy.contains('h6','Nails').click({force: true})
    cy.contains('h4','Nails pink').click({force: true})
    cy.wait(1200)
    // cy.contains('h4','Nails red').click({force: true})
    // cy.contains('Button','Continue').click({force: true})
    // cy.contains('div>p','Naomi').parent().parent().parent().parent().find('span').first().should('exist')
    // cy.contains('div>p','Naomi').parent().parent().parent().parent().find('span').first().click({force: true})
    cy.wait(1000)
    cy.contains('div>button','Continue').should('exist')
    cy.contains('div>button','Continue').click()
    // cy.contains('div>button','Go to the next day').should('exist')
    // cy.contains('div>button','Go to the next day').click()
    cy.contains('div>p','Mateo').parent().parent().parent().parent().find('span').first().should('exist')
    cy.contains('div>p','Mateo').parent().parent().parent().parent().find('span').first().click({force: true})
    cy.wait(1000)
    cy.contains('div>button','Checkout').should('exist')
    cy.contains('div>button','Checkout').click()
    cy.contains('p','Credit').should('exist')
    cy.contains('p','Credit').click()
    cy.contains('button','CHECKOUT').should('exist')
    cy.contains('button','CHECKOUT').click()
    cy.wait(2100)
    cy.contains('h6','PAYMENT FOR').should('exist')

    cy.contains('h6','Bookr').should('exist')


    cy.get('#card_input').next('input').click({force: true}).type('4508750015741019', {force: true, delay: 50})

    // /gateway/api/payment/carts/66c4c903ba510df2bbe93a33

    // cy.contains('div>h4','Pay With').parent().find('p[text()="Credit"]').should('exist')
    // cy.contains('div>h4','Pay With').parent().find('p[text()="Credit"]').click()
    // cy.wait('@new-user').then((interception) => {
    //   expect(interception.response.statusCode).to.equal(401)
    // })
    // cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })

//   it('Verify it is not possible to create a new appointment for 1 service and 1 offer - Read Only credentials', () => {
//     searchTimeSlot('Naomi ','08:00')  
//     // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
//     cy.get('.css-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
//     cy.contains('Add New Item').should('exist')  
//     cy.contains('Add New Item').click()
//     cy.contains('Add Offer').should('exist')  
//     cy.contains('Add Offer').click()
//     cy.contains('div','Offer').should('exist')  
//     cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
//     cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('nao{enter}')
//     cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
//     cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
//     cy.contains('Create Appointment').click({force: true})
//     cy.wait('@new-user').then((interception) => {
//       expect(interception.response.statusCode).to.equal(401)
//     })
//     cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
//     }) 
  })