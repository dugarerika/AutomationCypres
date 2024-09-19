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

const bookServiceWeblinkApp = (category, service, staff, paymentMethod) => {
  cy.contains('button>span','Services').click({force: true})
  cy.contains('div>button','At Vendor').click({force: true})
  cy.contains('h6',category).click({force: true})
  cy.contains('h4',service).click({force: true})
  cy.wait(2200)
  cy.contains('div>button','Continue').should('exist')
  cy.contains('div>button','Continue').click()

  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().should('exist')
  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().then(($span) => {
    var startTime = $span.text()
    cy.log('startTime')
    cy.log(startTime)
    cy.contains('div>p',staff).parent().parent().parent().parent().find('small').first().then(($small) => {
      var AmPm = $small.text()
      cy.log('AmPm')
      cy.log(AmPm)
      cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().click({force: true})
      cy.wait(1000)
      cy.contains('div>button','Checkout').should('exist')
      cy.contains('div>button','Checkout').click()
      cy.contains('p',paymentMethod).should('exist')
      cy.contains('p',paymentMethod).click()
      cy.wait(100)
      cy.contains('button','CHECKOUT').should('exist')
      cy.contains('button','CHECKOUT').click()
      cy.wait(2000)

      loginOldVendor('Admin Section', 'artnailcorner','1234567890')
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(12000)
      cy.contains(`${startTime} ${AmPm}`).scrollIntoView()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        var color = $div.attr("color")
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).should('be.visible')
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.wait(3000)
      cy.contains('Appointment Details').should('be.visible')  
      cy.contains('p',`${startTime} ${AmPm}`).should('be.visible')  
      cy.contains('p',`${service}`, {matchCase: false}).should('be.visible')  
      cy.contains('div>span',`WEB`).should('be.visible') 
      
    })
  })
}

const bookHomeServiceWeblinkApp = (category, service, staff, paymentMethod) => {
  cy.contains('button>span','Services').click({force: true})
  cy.contains('div>button','Home Service').click({force: true})
  cy.contains('div>p','Choose Your Area').parent().next('div').find('input').should('exist')
  cy.contains('div>p','Choose Your Area').parent().next('div').find('input').click({force: true}).type('Al {enter}',{force: true, delay: 500})
  cy.wait(2200)
  cy.contains('h6',category).click({force: true})
  cy.contains('h4',service).click({force: true})
  cy.wait(2200)
  cy.contains('div>button','Continue').should('exist')
  cy.contains('div>button','Continue').click()
  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().should('exist')
  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().then(($span) => {
    var startTime = $span.text()
    cy.log('startTime')
    cy.log(startTime)
    cy.contains('div>p',staff).parent().parent().parent().parent().find('small').first().then(($small) => {
      var AmPm = $small.text()
      cy.log('AmPm')
      cy.log(AmPm)
      cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().click({force: true})
      cy.wait(1000)
      cy.contains('div>button','Checkout').should('exist')
      cy.contains('div>button','Checkout').click()
      cy.contains('div','Choose address').next('div').find('input').should('exist')
      cy.contains('div','Choose address').next('div').find('input').click({force: true}).type('Al {enter}',{force: true, delay: 500})
      cy.contains('p',paymentMethod).should('exist')
      cy.contains('p',paymentMethod).click()
      cy.wait(100)
      cy.contains('button','CHECKOUT').should('exist')
      cy.contains('button','CHECKOUT').click()
      cy.wait(2000)
      loginOldVendor('Admin Section', 'artnailcorner','1234567890')
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(12000)
      cy.contains(`${startTime} ${AmPm}`).scrollIntoView()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        var color = $div.attr("color")
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).should('be.visible')
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.wait(3000)
      cy.contains('Appointment Details').should('be.visible')  
      cy.contains('p',`${startTime} ${AmPm}`).should('be.visible')  
      cy.contains('p',`${service}`, {matchCase: false}).should('be.visible')  
      cy.contains('div>span',`WEB`).should('be.visible') 
      
    })
  })
}

const bookOfferWeblinkApp = (offer, staff, paymentMethod) => {
  cy.contains('button>span','Offer').click({force: true})
  cy.contains('div>button','At Vendor').click({force: true})
  // cy.contains('h6',category).click({force: true})
  cy.contains('h4',offer).click({force: true})
  cy.wait(2200)
  cy.contains('div>button','Continue').should('exist')
  cy.contains('div>button','Continue').click()

  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().should('exist')
  cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().then(($span) => {
    var startTime = $span.text()
    cy.log('startTime')
    cy.log(startTime)
    cy.contains('div>p',staff).parent().parent().parent().parent().find('small').first().then(($small) => {
      var AmPm = $small.text()
      cy.log('AmPm')
      cy.log(AmPm)
      cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().click({force: true})
      cy.wait(1000)
      cy.contains('div>button','Checkout').should('exist')
      cy.contains('div>button','Checkout').click()
      cy.contains('p',paymentMethod).should('exist')
      cy.contains('p',paymentMethod).click()
      cy.wait(100)
      cy.contains('button','CHECKOUT').should('exist')
      cy.contains('button','CHECKOUT').click()
      cy.wait(2000)
      cy.wait(2000)
      loginOldVendor('Admin Section', 'artnailcorner','1234567890')
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(2000)
      cy.contains(`${startTime} ${AmPm}`).scrollIntoView()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        var color = $div.attr("color")
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).should('be.visible')
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.wait(3000)
      cy.contains('Appointment Details').should('be.visible')  
      cy.contains('p',`${startTime} ${AmPm}`).should('be.visible')  
      cy.contains('div>span',`WEB`).should('be.visible') 
      
    })
  })
}

describe('Weblink |Create appointments through deeplink', () => {

  beforeEach(() => {
    loginDeeplink('User Section', 'wendyzulca3@gmail.com','1234567890')
    cy.wait(1000)
    cy.visit('https://stg.customer.bookr-dev.com/vendors/athary-world-nail-')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment through deeplink for 1 service to pay at salon', () => {
    var staff = "Naomi naomi"
    var category = "Nails"
    var service = "Nails pink"
    var paymentMethod = "Pay at Vendor"
    bookServiceWeblinkApp(category,service,staff,paymentMethod)
    cy.contains('button',`No Status`).should('be.visible')  
  })

  it('Verify it is not possible to create an appointment through deeplink for 1 service paid with Wallet  - Readonly credentials', () => {
    var staff = "Susan one"
    var category = "Nails"
    var service = "Nails pink"
    var paymentMethod = "Wallet"
    bookServiceWeblinkApp(category,service,staff,paymentMethod)
    cy.contains('button',`Paid Online`).should('be.visible')  
    cy.contains('li>h4',`${paymentMethod}`).should('be.visible')  
  })

  it('Verify it is not possible to create an appointment through deeplink for 1 Home service to pay at salon', () => {
    var staff = "Naomi naomi"
    var category = "Nails"
    var service = "Nails pink"
    var paymentMethod = "Pay at Vendor"
    bookHomeServiceWeblinkApp(category,service,staff,paymentMethod)
    cy.contains('button',`No Status`).should('be.visible')  
  })

  it('Verify it is not possible to create an appointment through deeplink for 1 Home service paid with Wallet  - Readonly credentials', () => {
    var staff = "Susan one"
    var category = "Nails"
    var service = "Nails pink"
    var paymentMethod = "Wallet"
    bookHomeServiceWeblinkApp(category,service,staff,paymentMethod)
    cy.contains('button',`Paid Online`).should('be.visible')  
    cy.contains('li>h4',`${paymentMethod}`).should('be.visible')  
  })


  it('Verify it is not possible to create an appointment through deeplink for 1 offer to pay at salon', () => {
  var staff = "Naomi naomi"
  var offer = "Offer with only 1 service"
  var paymentMethod = "Pay at Vendor"
  bookOfferWeblinkApp(offer,staff,paymentMethod)
  cy.contains('button',`No Status`).should('be.visible')  
})

  it('Verify it is not possible to create an appointment through deeplink for 1 offer paid with Wallet  - Readonly credentials', () => {
    var staff = "Susan one"
    var offer = "Offer with only 1 service"
    var paymentMethod = "Wallet"
    bookOfferWeblinkApp(offer,staff,paymentMethod)
    cy.contains('button',`Paid Online`).should('be.visible')  
    cy.contains('li>h4',`${paymentMethod}`).should('be.visible')  
  })

  it.skip('Verify it is not possible to create an appointment through deeplink for 1 service paid with Credit  - Readonly credentials', () => {
    var staff = "Susan one"
    var category = "Nails"
    var service = "Nails pink"
    var paymentMethod = "Credit"
    cy.contains('button>span','Services').click({force: true})
    cy.contains('div>button','At Vendor').click({force: true})
    cy.contains('h6',category).click({force: true})
    cy.contains('h4',service).click({force: true})
    cy.wait(2200)
    cy.contains('div>button','Continue').should('exist')
    cy.contains('div>button','Continue').click()
  
    cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().should('exist')
    cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().then(($span) => {
      var startTime = $span.text()
      cy.log('startTime')
      cy.log(startTime)
      cy.contains('div>p',staff).parent().parent().parent().parent().find('small').first().then(($small) => {
        var AmPm = $small.text()
        cy.log('AmPm')
        cy.log(AmPm)
        cy.contains('div>p',staff).parent().parent().parent().parent().find('span').first().click({force: true})
        cy.wait(1000)
        cy.contains('div>button','Checkout').should('exist')
        cy.contains('div>button','Checkout').click()
        cy.contains('p',paymentMethod).should('exist')
        cy.contains('p',paymentMethod).click()
        cy.contains('button','CHECKOUT').should('exist')
        cy.contains('button','CHECKOUT').click()
        cy.url().should('include', 'https://checkout.tap.company/')
        cy.get('input[placeholder = "Card number"]').should('exist')
        cy.get('input[placeholder = "Card number"]').type('5123450000000008')
        cy.wait(200000)
  
        loginOldVendor('Admin Section', 'artnailcorner','1234567890')
        cy.visit('https://staging.vendor.bookr-dev.com/calendar')
        cy.wait(12000)
        cy.contains(`${startTime} ${AmPm}`).scrollIntoView()
        cy.contains(`${staff}`).parent('div').then(($div) => {
          var color = $div.attr("color")
          cy.log(color)
          cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).should('be.visible')
          cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${startTime} ${AmPm}"]`).click({force: true})
          cy.log('Test completed')
        })
        cy.wait(3000)
        cy.contains('Appointment Details').should('be.visible')  
        cy.contains('p',`${startTime} ${AmPm}`).should('be.visible')  
        cy.contains('p',`${service}`, {matchCase: false}).should('be.visible')  
        cy.contains('div>span',`WEB`).should('be.visible') 
        
      })
    })
    cy.contains('button',`Paid Online`).should('be.visible')  
    cy.contains('li>h4',`${paymentMethod}`).should('be.visible')  
  })

})