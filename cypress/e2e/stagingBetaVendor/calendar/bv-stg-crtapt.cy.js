/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
  
const searchTimeSlot = (staff,start_time) => {
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
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
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
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

describe('Staging - Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearAllSavedSessions)
})

beforeEach(() => {
    cy.login('Admin Session', Cypress.env("Vendor_Admin_Username_Staging"), Cypress.env("Vendor_Admin_Password_Staging"))
})

afterEach(() => {
  cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth?nativeLogout=true')
})

it('Verify it is possible to create a new appointment for 1 service and 1 offer', () => {
  searchTimeSlot('Susan one','03:00') 
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.contains('Add New Item').should('exist')  
  cy.contains('Add New Item').click()
  cy.contains('Add Offer').should('exist')  
  cy.contains('Add Offer').click()
  cy.contains('div','Offer').should('exist')  
  cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer{enter}')
  cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{enter}')
  cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('Create Appointment').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
  cy.contains('New Appointment').should('not.be.visible')  
  }) 

it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
  searchTimeSlot('Susan one','06:00') 
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('Create Appointment').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
  cy.contains('New Appointment').should('not.be.visible')  
})

it('Verify it is possible to create an appointment searching and selecting customer from vendor', () => {
  searchTimeSlot('Naomi Naomi','06:00') 
  cy.contains('h2','New Appointment').parent('div').next('div').find('div','Search customer..').next('div').children('input').type('erika{downarrow}{enter}',{force: true, delay: 1000})
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('Create Appointment').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
  cy.contains('New Appointment').should('not.be.visible')  
})

it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment', () => {
  searchTimeSlot('Naomi Naomi','07:00')  
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.contains('Create Appointment').click({force: true})
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('Warning: ').should('be.visible')
  cy.contains('button','Continue').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
  cy.contains('New Appointment').should('not.be.visible')  
})

it('Verify it is possible to create an appointment over and already taken time slot - Admin Credentials', () => {
  searchTimeSlot('Naomi Naomi','07:00') 
  cy.contains('New Appointment').should('exist')
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.contains('Create Appointment').click({force: true})
  cy.contains('Warning: ').should('be.visible')
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('button','Continue').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  }) 
})

it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
  searchTimeSlot('ALEX ALEX','07:00')  
  cy.contains('New Appointment').should('exist')
  cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
  cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
  cy.contains('Create Appointment').click({force: true})
  cy.wait('@new-user').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
  })
  cy.contains('New Appointment').should('not.be.visible')  
})

it('Verify The edit appointment modal is display after clicking on Edit booking button', () => {
  searchApt('ALEX ALEX','07:00') 
  cy.log('Test completed')
  cy.contains('Appointment Details').should('be.visible')
  cy.contains('Edit Booking').should('be.visible')
  cy.contains('Edit Booking').click({force: true})
  cy.contains('Edit Appointment').should('exist') 
})

it('Verify it is possible to edit the Customer', () => {
  searchApt('ALEX ALEX','07:00') 
  cy.contains('Appointment Details').should('be.visible')
  cy.contains('Edit Booking').should('be.visible')
  cy.contains('Edit Booking').click({force: true})
  cy.contains('Edit Appointment').should('exist') 
  cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
  cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
  cy.wait(1000)
})
})

describe('Staging - Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Receptionist credentials', () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearAllSavedSessions)
  })
  
  beforeEach(() => {
    cy.login('Receptionist Session', Cypress.env("Vendor_Receptionist_Username_Staging"), Cypress.env("Vendor_Receptionist_Password_Staging"))
  })

  afterEach(() => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth?nativeLogout=true')
  })

  after(() => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer', () => {
    searchTimeSlot('Zstaff ','06:00')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
    }) 

  it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
    searchTimeSlot('Susan one','07:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor', () => {
    searchTimeSlot('Mateo','06:00') 
    // cy.contains("Search customer..").next('div').should('exist')
    // cy.contains("Search customer..").next('div').children('input').click({force: true})
    // cy.contains("Search customer..").next('div').children('input').type('erika{enter}{enter}',{force: true, delay: 1000})
    cy.contains('h2','New Appointment').parent('div').next('div').find('div','Search customer..').next('div').children('input').type('erika{downarrow}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment', () => {
    searchTimeSlot('Zstaff','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment over and already taken time slot', () => {
    searchTimeSlot('Zstaff','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('Warning: ').should('be.visible')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
    searchTimeSlot('Mateo','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
    searchTimeSlot('ErikaT','06:00') 
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button', () => {
    searchApt('Mateo','06:00') 
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
  })

  it('Verify it is possible to edit the Customer', () => {
    searchApt('Mateo','06:00') 
    cy.contains('Appointment Details').should('be.visible')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.wait(1000)
  })
})

describe('Staging - Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Staff credentials', () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearAllSavedSessions)
  })
  
  beforeEach(() => {
    cy.login('Staff Session', Cypress.env("Vendor_Staff_Username_Staging"), Cypress.env("Vendor_Staff_Password_Staging"))
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })    

  after(() => {
    //https://vendor.beta.bookr-dev.com/auth
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  })

  it('Verify it is possible to create a new appointment for 1 service and 1 offer', () => {
    searchTimeSlot('Zumba Zumba','03:00')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    // cy.get('.css-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('{downarrow}{downarrow}{downarrow}{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{downarrow}{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
    }) 
    
  it('Verify the New appointment modal is hidden after creating successfully an appointment', () => {
    searchTimeSlot('Zumba Zumba','06:00')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Hair{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor', () => {
    searchTimeSlot('Zumba Zumba','05:00')
    cy.contains('h2','New Appointment').parent('div').next('div').find('div','Search customer..').next('div').children('input').type('erika{downarrow}{enter}',{force: true, delay: 1000})
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment', () => {
    searchTimeSlot('Zumba Zumba','06:00')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.contains('Create Appointment').click({force: true})
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it.skip('Verify The edit appointment modal is display after clicking on Edit booking button', () => {
    searchTimeSlot('Zumba Zumba','07:00')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
  })

  it.skip('Verify it is possible to edit the Customer', () => {
    searchTimeSlot('Zumba Zumba','07:00')
    cy.contains('Edit Booking').should('be.visible')
    cy.contains('Edit Booking').click({force: true})
    cy.contains('Edit Appointment').should('exist') 
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
    cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
    cy.wait(1000)
  })
})

describe('Staging - Beta Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearAllSavedSessions)
  })

  beforeEach(() => {
    cy.login('ReadOnly Session', Cypress.env("Vendor_ReadOnly_Username_Staging"), Cypress.env("Vendor_ReadOnly_Password_Staging"))
  })

  afterEach(() => {
    cy.clearCookies()
  })

  after(() => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'auth')
  })

  it('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    searchTimeSlot('Naomi Naomi','03:00')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('span','User does not have enough permissions to use this service').should('be.visible')  
  })

  it('Verify it is not possible to create a new appointment for 1 service and 1 offer - Read Only credentials', () => {
    searchTimeSlot('Naomi Naomi','04:00')  
    // cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.get('.css-1u3or2w>*').eq(1).find('input').first().click().type('{downarrow}{enter}')
    cy.contains('Add New Item').should('exist')  
    cy.contains('Add New Item').click()
    cy.contains('Add Offer').should('exist')  
    cy.contains('Add Offer').click()
    cy.contains('div','Offer').should('exist')  
    cy.xpath('//span[text()="Offer"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('Offer{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(1).click().type('nao{enter}')
    cy.get('.css-1u3or2w').eq(1).children('div').next('div').find('input').eq(2).click().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.contains('span','User does not have enough permissions to use this service').should('be.visible') 
    }) 
})