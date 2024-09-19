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
 
const searchTimeSlot = (staff,start_time) => {
  cy.visit('https://staging.vendor.bookr-dev.com/calendar')
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
  cy.visit('https://staging.vendor.bookr-dev.com/calendar')
  let color1
  // cy.get('.tool-datepicker-next').should('be.visible')
  // cy.get('.tool-datepicker-next').click()
  // cy.get('.tool-datepicker-next').click()
  cy.wait(2000)
  cy.contains(`${staff}`).parent('div').then(($div) => {
    color1 = $div.attr('color')
    cy.log(color1)
    cy.xpath(`//div[@color="${color1}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
    cy.xpath(`//div[@color="${color1}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
  })
  cy.contains('Appointment Details').should('be.visible')
}
describe('Vendor Admin | Calendar |Create appointments by Clicking on the calendar| logged with Staff credentials', () => {

  beforeEach(() => {
    login('Staff Session', 'zumba11','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','08:00')  
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
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  }) 

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','06:00') 
    cy.contains('Zumba Zumba').should('exist')
  })
  
  it('Verify it is possible to scrool down on the calendar an create a new appointment- Staff credentials', () => {
    cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    let staff = "Zumba Zumba"
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
    searchTimeSlot('Zumba Zumba','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  }) 


  it('Verify it is possible to create an appointment over and already taken time slot - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','06:00')  
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
    searchTimeSlot('Zumba Zumba','07:00')  
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('Wendy{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    searchApt('Zumba Zumba','07:00')
  })

  it('Verify it is possible to create an appointment searching Phone number without country code on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','09:00')  
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
    searchApt('Zumba Zumba','09:00') 
    cy.contains('div>p','+973').should('exist')
  })

  it('Verify it is possible to create an appointment searching Phone number with country code without + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','10:00')  
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
    searchApt('Zumba Zumba','10:00') 
    cy.contains('div>p','+973').should('exist')
  })

  it('Verify it is possible to create an appointment searching Phone number with country code with + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Zumba Zumba','11:00')  
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
    searchApt('Zumba Zumba','11:00') 
    cy.contains('div>p','+973').should('exist')
  })
})

describe('Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

  beforeEach(() => {
    login('Admin Section', 'artnailcorner','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Admin credentials', () => {
    searchTimeSlot('Zumba Zumba','07:00')  
    cy.contains('Zumba Zumba').should('exist')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchTimeSlot('Susan one','08:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{enter}')
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
    searchTimeSlot('Susan one','07:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Admin credentials', () => {
    searchTimeSlot('Zstaff ','07:00')  
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
    searchTimeSlot('Zstaff ','07:00')   
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
    searchTimeSlot('Zstaff ','07:00')  
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
    searchTimeSlot('Marly william','07:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin Credentials', () => {
    searchTimeSlot('Naomi','07:00')   
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })
})

describe('Vendor Admin | Calendar | Create appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

  beforeEach(() => {
    login('Receptionist Session', 'recep6','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })
  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Receptionist credentials', () => {
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

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Receptionist credentials', () => {
    searchTimeSlot('Marly william ','08:00') 
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
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
    })  

  it('Verify the New appointment modal is hidden after creating successfully an appointment  - Receptionist credentials', () => {
    searchTimeSlot('Zstaff ','05:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor  - Receptionist credentials', () => {
    searchTimeSlot('Zstaff ','06:00') 
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
    searchTimeSlot('Zstaff ','06:00')  
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
    searchTimeSlot('Zstaff ','06:00') 
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
    searchTimeSlot('Marly william','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    cy.log('Test completed')
  })
})

describe('Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    login('Readonly Session', 'readonly31','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    searchTimeSlot('Zstaff','08:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })

  it('Verify it is not possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchTimeSlot('Zstaff ','08:00')  
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