/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const searchTimeSlot = (staff,start_time) => {
  cy.visit('https://vendor.bookr-dev.com//calendar')
  let color
  // cy.get('.tool-datepicker-next').should('be.visible')
  // cy.get('.tool-datepicker-next').click()
  // cy.get('.tool-datepicker-next').click()
  cy.wait(4000)
  cy.contains(`${staff}`).parent('div').then(($div) => {
    color = $div.attr('color')
    cy.log(color)
    cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
    cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
  })
  cy.contains('New Appointment').should('exist')  
}

const searchApt = (staff, start_time) => {
  cy.visit('https://vendor.bookr-dev.com//calendar')
  let color1
  // cy.get('.tool-datepicker-next').should('be.visible')
  // cy.get('.tool-datepicker-next').click()
  // cy.get('.tool-datepicker-next').click()
  cy.wait(2000)
  cy.contains(`${staff}`).parent('div').then(($div) => {
    color1 = $div.attr('color')
    color = $div.attr('color')
    cy.log(color1)
    // cy.xpath(`//div[@color="${color1}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
    // cy.xpath(`//div[@color="${color1}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
    cy.xpath(`//div[@data-schedule-time="${start_time} AM" and @color="${color1}"]`).should('be.visible')
    cy.xpath(`//div[@data-schedule-time="${start_time} AM" and @color="${color1}"]`).click({force: true})
  })
  cy.contains('Appointment Details').should('be.visible')
}
describe('Staging - Old Vendor Admin | Calendar |Create appointments by Clicking on the calendar| logged with Staff credentials', () => {

  beforeEach(() => {
    cy.loginov('Staff Session', 'erikat123','1234567890')
  })

  after(() => {
    cy.visit('https://vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Staff credentials', () => {
    searchTimeSlot('ErikaT ','03:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer1{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  }) 

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Staff credentials', () => {
    searchTimeSlot('ErikaT ','03:00') 
    cy.contains('ErikaT ').should('exist')
  })
  
  it('Verify it is possible to scrool down on the calendar an create a new appointment- Staff credentials', () => {
    cy.visit('https://vendor.bookr-dev.com//calendar')
    let staff = "ErikaT "
    let start_time = "18:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains('06:00 PM').scrollIntoView()
    cy.wait(1000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
    })
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create a new appointment - Staff credentials', () => {
    searchTimeSlot('ErikaT ','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  }) 


  it('Verify it is possible to create an appointment over and already taken time slot - Staff credentials', () => {
    searchTimeSlot('ErikaT ','06:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify it is possible to create an appointment searching customer name on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('ErikaT ','05:00')  
    cy.wait(70)
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.wait(70)
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('Wendy{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    cy.wait(700)
    // searchApt('ErikaT ','05:00')
  })

  it('Verify it is possible to create an appointment searching Phone number without country code on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('ErikaT ','04:00')  
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('38717494{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    cy.wait(700)
    searchApt('ErikaT ','04:00') 
    cy.contains('div>p','+973').should('exist')
  })

  it.skip('Verify it is possible to create an appointment searching Phone number with country code without + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('ErikaT ','02:00')  
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('97338717494{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    searchApt('ErikaT ','02:00') 
    cy.wait(700)
    cy.contains('div>p','+973').should('exist')
  })

  it.skip('Verify it is possible to create an appointment searching Phone number with country code with + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('ErikaT ','03:00')  
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('+97338717494{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    searchApt('ErikaT ','03:00') 
    cy.wait(700)
    cy.contains('div>p','+973').should('exist')
  })
})

describe('Staging - Old Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginov('Admin Section', 'artnailcorner','1234567890')
  })

  after(() => {
    cy.visit('https://vendor.bookr-dev.com//auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Admin credentials', () => {
    searchTimeSlot('ErikaT ','07:00')  
    cy.contains('ErikaT ').should('exist')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchTimeSlot('ALEX ALEX','03:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer1{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{downarrow}{enter}') //fecha
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
    }) 

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
    searchTimeSlot('ALEX ALEX','07:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Admin credentials', () => {
    searchTimeSlot('Mateo ','07:00')  
    cy.contains("Search customer..").next('div').should('exist')
    cy.contains("Search customer..").next('div').children('input').click({force: true})
    cy.contains("Search customer..").next('div').children('input').type('erika{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment - Admin credentials', () => {
    searchTimeSlot('Mateo ','07:00')   
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment over and already taken time slot - Admin Credentials', () => {
    searchTimeSlot('Mateo ','07:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
    searchTimeSlot('Maly ','07:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })
})

describe('Staging - Old Vendor Admin | Calendar | Create appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

  beforeEach(() => {
    cy.loginov('Receptionist Session', 'recep6','1234567890')
  })

  after(() => {
    cy.visit('https://vendor.bookr-dev.com//auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })
  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Receptionist credentials', () => {
    cy.visit('https://vendor.bookr-dev.com//calendar')
    let staff1 = "Mateo "
    let start_time = "03:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(6000)
    cy.contains(`${staff1}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')  
    cy.contains(`${staff1}`).should('exist')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Receptionist credentials', () => {
    searchTimeSlot('Maly  ','03:00') 
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer1{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
    })  

  it('Verify the New appointment modal is hidden after creating successfully an appointment  - Receptionist credentials', () => {
    searchTimeSlot('Mateo ','05:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor  - Receptionist credentials', () => {
    searchTimeSlot('Mateo ','06:00') 
    cy.contains("Search customer..").next('div').should('exist')
    cy.contains("Search customer..").next('div').children('input').click({force: true})
    cy.contains("Search customer..").next('div').children('input').type('erika{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment  - Receptionist credentials', () => {
    searchTimeSlot('Mateo ','06:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment over and already taken time slot - Receptionist credentials', () => {
    searchTimeSlot('Mateo ','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })
})

describe('Staging - Old Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    cy.loginov('Readonly Session', 'readonly835','1234567890')
  })

  after(() => {
    cy.visit('https://vendor.bookr-dev.com//auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    searchTimeSlot('Mateo','03:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })

  it('Verify it is not possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchTimeSlot('Mateo ','03:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer1{enter}')
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