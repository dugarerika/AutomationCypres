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
 
describe('Vendor Admin | Calendar |Create appointments by Clicking on the calendar| logged with Staff credentials', () => {

  beforeEach(() => {
    login('Staff Session', 'zumba','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Staff credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff1 = "Zumba Zumba"
    let start_time = "06:00"
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
  
  it('Verify it is possible to scrool down on the calendar an create a new appointment- Staff credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zumba Zumba"
    let start_time = "18:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zumba Zumba"
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
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


  it('Verify it is possible to create an appointment over and already taken time slot - Staff credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zumba Zumba"
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Staff credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zumba Zumba"
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
    cy.contains("Search customer..").next('div').should('exist')
    cy.contains("Search customer..").next('div').children('input').click({force: true})
    cy.contains("Search customer..").next('div').children('input').type('juan{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
  })
})

describe('Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

  beforeEach(() => {
    login('Admin Section', 'artnailcorner','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff1 = "Susan "
    let start_time = "07:00"
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

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Susan "
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
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

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('New Appointment').should('exist')  
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('New Appointment').should('exist')  
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
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

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin Credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Naomi"
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
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

  it('Verify The edit appointment modal is display after clicking on Edit booking button - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
  })

  it('Verify it is possible to edit the Customer - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "07:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.wait(1000)
  })
})

describe('Vendor Admin | Calendar | Create appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

  beforeEach(() => {
    login('Receptionist Session', 'recep6','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })
  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Admin credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff1 = "Zstaff "
    let start_time = "08:00"
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

  it('Verify the New appointment modal is hidden after creating successfully an appointment  - Receptionist credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "08:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
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

  it('Verify it is possible to create an appointment searching and selecting customer from vendor  - Receptionist credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('New Appointment').should('exist')  
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
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment  - Receptionist credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    cy.log('Test completed')
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button  - Receptionist credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
      cy.log('Test completed')
    })
    cy.log('Test completed')
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.log('Test completed')
  })

  it('Verify it is possible to edit the Customer  - Receptionist credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Marly william"
    let start_time = "06:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
      cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
    })
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.log('Test completed')
  })
})

describe('Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    login('Readonly Session', 'readonly3','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })
  it.only('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zstaff "
    let start_time = "08:00"
    let color
    cy.get('.tool-datepicker-next').should('be.visible')
    cy.get('.tool-datepicker-next').click()
    cy.wait(7000)
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })
  
  })