/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const loginDeeplink = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://stg.customer.bookr-dev.com/auth')
    cy.url().should('include', 'https://stg.customer.bookr-dev.com/auth')
    cy.wait(1000)
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

const loginOldVendor = (name, username, password) => {
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
  
const searchApt = (sstaff, start_time, am_pm) => {
  cy.visit('https://staging.vendor.bookr-dev.com/calendar')
  let color
  cy.log(start_time)
  cy.log(am_pm)
  cy.log(`${sstaff} p`)
cy.contains(`${sstaff}`).parent('div').then(($div) => {
  color = $div.attr('color')
  cy.log(start_time)
  cy.log(am_pm)
  cy.log(`${sstaff} p`)
  cy.log('this is the color')
  cy.log(color)
  cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} PM"]`).should('be.visible')
  cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} ${am_pm}"]`).click()
  cy.log('Test completed')
})
cy.contains('Appointment Details').should('be.visible')
}

describe('Weblink |Create appointments through deeplink', () => {

  beforeEach(() => {
    loginDeeplink('User Section', 'dugarerika@gmail.com','1234567890')
    cy.wait(1000)
    cy.visit('https://stg.customer.bookr-dev.com/vendors/athary-world-nail-')
  })
 
  afterEach(() => {
    cy.clearCookies()
  })

  it.only('Verify it is not possible to create an appointment through deeplink for 1 service to pay at salon', () => {
    let staff = "Naomi naomi"
    let category = "Nails"
    let service = "Nails pink"
    let paymentMethod = "Pay at Vendor"
    let startTime 
    let AmPm
    let color
    cy.contains('button>span','Services').click({force: true})
    cy.contains('div>button','At Vendor').click({force: true})
    cy.contains('h6',category).click({force: true})
    cy.contains('h4',service).click({force: true})
    cy.wait(1200)
    cy.wait(1000)
    cy.contains('div>button','Continue').should('exist')
    cy.contains('div>button','Continue').click()
  
    cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().should('exist')
    cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().then(($span) => {
      startTime = $span.text()
      cy.log('startTime')
      cy.log(startTime)
    })

    cy.contains('div>p',staff).parent().parent().parent().parent().find('small').first().then(($small) => {
      AmPm = $small.text()
      cy.log('AmPm')
      cy.log(AmPm)
    })
    cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().click({force: true})
    cy.wait(1000)
    cy.contains('div>button','Checkout').should('exist')
    cy.contains('div>button','Checkout').click()
    cy.contains('p',paymentMethod).should('exist')
    cy.contains('p',paymentMethod).click()
    cy.contains('button','CHECKOUT').should('exist')
    cy.contains('button','CHECKOUT').click()
    cy.wait(2000)
    loginOldVendor('Admin Section', 'artnailcorner','1234567890')
    cy.wait(3000)
    cy.wait(2000)
    // cy.contains('10:00 PM').scrollIntoView()
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    cy.wait(3000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr("color")
      cy.log(color)
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} PM"]`).should('be.visible')
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} PM"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.wait(3000)
    cy.contains('Appointment Details').should('be.visible')
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

})