/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const searchTimeSlot = (staff,start_time) => {
  // https://vendor.bookr.co/calendar
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'calendar')
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
  cy.visit(Cypress.env("URL_OldVendor_Production") + 'calendar')
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
describe('Production - Old Vendor Admin | Calendar |Create appointments by Clicking on the calendar| logged with Staff credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Staff Session', Cypress.env("Vendor1_Staff_Username_Production"), Cypress.env("Vendor1_Staff_Password_Production"))
  })

  after(() => {
    cy.visit('https://vendor.bookr.co/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Staff credentials', () => {
    searchTimeSlot('Aura','01:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('test offer{enter}')
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
    searchTimeSlot('Aura','01:00') 
    cy.contains('Aura').should('exist')
  })
  
  it('Verify it is possible to scrool down on the calendar an create a new appointment- Staff credentials', () => {
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'calendar')
    let staff = "Aura"
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
    searchTimeSlot('Aura','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  }) 


  it('Verify it is possible to create an appointment over and already taken time slot - Staff credentials', () => {
    searchTimeSlot('Aura','06:00')  
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
    searchTimeSlot('Aura','05:00')  
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
    searchApt('Aura','05:00')
  })

  it('Verify it is possible to create an appointment searching Phone number without country code on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Aura','04:00')  
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().should('exist')
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().click({force: true})
    cy.contains('h2','New Appointment').parents('div').next('div').find('input').first().type('38972467{enter}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')
    cy.wait(700)
    searchApt('Aura','04:00') 
    cy.contains('div>p','+973').should('exist')
  })

  it.skip('Verify it is possible to create an appointment searching Phone number with country code without + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Aura','02:00')  
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
    searchApt('Aura','02:00') 
    cy.wait(700)
    cy.contains('div>p','+973').should('exist')
  })

  it.skip('Verify it is possible to create an appointment searching Phone number with country code with + on the New Appointment modal - Staff credentials', () => {
    searchTimeSlot('Aura','03:00')  
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
    searchApt('Aura','03:00') 
    cy.wait(700)
    cy.contains('div>p','+973').should('exist')
  })
})

describe('Production - Old Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Admin Section', Cypress.env("Vendor1_Admin_Username_Production"), Cypress.env("Vendor1_Admin_Password_Production"))
  })

  after(() => {
    cy.visit('https://vendor.bookr.co/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Admin credentials', () => {
    searchTimeSlot('Sam','07:00')  
    cy.contains('Erika').should('exist')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    searchTimeSlot('Sam','08:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-ltr-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offe r').should('exist')  
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
    searchTimeSlot('Erika','07:00')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Admin credentials', () => {
    searchTimeSlot('Susan','07:00')  
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
    searchTimeSlot('Jaira','07:00')   
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
    searchTimeSlot('Joan Permission','07:00')  
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
})

describe('Production - Old Vendor Admin | Calendar | Create appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Production"), Cypress.env("Vendor_Receptionist_Password_Production"))
  })

  after(() => {
    cy.visit('https://vendor.bookr.co/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })
  it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Receptionist credentials', () => {
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'calendar')
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
})

describe('Production - Old Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    cy.loginovprd('Readonly Session', Cypress.env("Vendor_ReadOnly_Username_Production"), Cypress.env("Vendor_ReadOnly_Password_Production"))
  })

  after(() => {
    cy.visit('https://vendor.bookr.co/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    searchTimeSlot('Zstaff','08:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/ssr/main/api/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').should('not.exist')
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
    cy.contains('Create Appointment').should('not.exist')
    }) 
  })