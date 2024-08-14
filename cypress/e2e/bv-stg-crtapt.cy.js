/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.url().should('include', 'https://beta.vendor.bookr-dev.com/auth')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.xpath('//button[text()="Login"]').should('be.visible')
    cy.get('[type="text"]').type(username, {force: true, delay: 50})
    cy.get('[type="password"]').type(password,{force: true, delay: 50})
    cy.intercept('POST', '/api/main/auth/login').as('sign')
    cy.xpath('//button[text()="Login"]').click()
    cy.wait('@sign').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })          
  })
}

describe('Beta Vendor Admin | logged with Admin credentials', () => {
    
  beforeEach(() => {
    login('Admin Section', 'testsalon','testsalon1o')
  })

  afterEach(() => {
    cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe.only('Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {

    it.only('Verify it is possible to create a new appointment for 1 service and 1 offer - Staff credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Susan "
      let start_time = "08:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
      // cy.wait(7000)
      cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      })
      cy.contains('New Appointment').should('exist')  
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
      }) 
    
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Susan "
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.contains('New Appointment').should('exist')
      cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify it is possible to create an appointment searching and selecting customer from vendor - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Zara staff"
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Zara staff"
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Warning: ').should('be.visible')
      cy.contains('button','Continue').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify it is possible to create an appointment over and already taken time slot - Admin Credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Zara staff"
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('button','Continue').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      }) 
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Mateo "
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.contains('New Appointment').should('exist')  
      cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin Credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Jaira "
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
      cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
        cy.log('Test completed')
      })
      cy.contains('New Appointment').should('exist')  
      cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify The edit appointment modal is display after clicking on Edit booking button - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Mateo "
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Mateo "
      let start_time = "07:00"
      let color
      // cy.get('.tool-datepicker-next').should('be.visible')
      // cy.get('.tool-datepicker-next').click()
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

})

describe('Beta Vendor Admin | logged with Receptionist credentials', () => {
    
  beforeEach(() => {
    login('Staff Section', 'receptionist9','1234567890')
  })

  afterEach(() => {
    cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

describe.only('Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Receptionist credentials', () => {
    
  it('Verify the New appointment modal is hidden after creating successfully an appointment - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Susan "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Zara staff"
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Zara staff"
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment over and already taken time slot - Receptionist Credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Zara staff"
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Mateo "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an appointment - Receptionist Credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Jaira "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')  
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Mateo "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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

  it('Verify it is possible to edit the Customer - Receptionist credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Mateo "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
})

describe('Beta Vendor Admin | logged with Staff credentials', () => {
    
  beforeEach(() => {
    login('Staff Section', 'erika40','1234567890')
  })

  afterEach(() => {
    cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

describe.only('Beta Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Staff credentials', () => {
    
  it('Verify the New appointment modal is hidden after creating successfully an appointment - Staff credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
    cy.contains(`${staff}`).parent('div').then(($div) => {
      color = $div.attr('color')
      cy.log(color)
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
      cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
      cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
    cy.xpath('//span[text()="Service"]/parent::label/following-sibling::div/div/div/div/following-sibling::div/input').click().type('{downarrow}{enter}')
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment searching and selecting customer from vendor - Staff credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "07:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment - Staff credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('Warning: ').should('be.visible')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('New Appointment').should('not.be.visible')  
  })

  it('Verify it is possible to create an appointment over and already taken time slot - Staff Credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "06:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.contains('button','Continue').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    }) 
  })

  it('Verify The edit appointment modal is display after clicking on Edit booking button - Staff credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "07:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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

  it('Verify it is possible to edit the Customer - Staff credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Erika "
    let start_time = "07:00"
    let color
    // cy.get('.tool-datepicker-next').should('be.visible')
    // cy.get('.tool-datepicker-next').click()
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
})

describe.only('Beta Vendor Admin | Calendar| Create appointments by Clicking on the calendar | logged with Read Only credentials', () => {

  beforeEach(() => {
    login('Staff Section', 'erika40','1234567890')
  })

  afterEach(() => {
    cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  it('Verify it is not possible to create an appointment when loggeed with readonly creadentials  - Readonly credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Naomi "
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
    cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
  })

  it('Verify it is not possible to create a new appointment for 1 service and 1 offer - Admin credentials', () => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let staff = "Naomi "
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
    })
    cy.contains('New Appointment').should('exist')  
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
    cy.intercept('POST', '/api/main/vendor/bookings/validate/slots').as('new-user')
    cy.contains('Create Appointment').click({force: true})
    cy.wait('@new-user').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.contains('User does not have enough permissions to use this service').should('not.be.visible')  
    }) 
    
  
  })
