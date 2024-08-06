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
    cy.get('#username').click().type(username, {force: true, delay: 70})
    cy.get('#password').click().type(password,{force: true, delay: 70})
    cy.intercept('POST', '/ssr/main/api/auth/login').as('sign')
    cy.get('button').contains('Sign in').click()
    cy.wait(100)
    cy.wait('@sign').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })          
  })
}

describe('Vendor Admin | logged with Staff credentials', () => {
    
  beforeEach(() => {
    login('Staff Session', 'erika40','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  describe.only('Create appointments by Clicking on the calendar| logged with Staff credentials', () => {

    it('Verify the Staff shown in the New appointment modal is the one clicked on the calendar - Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      let staff1 = "Erika "
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
      let staff = "Erika "
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
      let staff = "Erika "
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
      let staff = "Erika "
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
      let staff = "Erika "
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

  describe('Vendor Admin | Login/logout| logged with Staff credentials', () => {
    
    it('Login into vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })
  
    it('Logout from vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.get('button').contains('erika40').should('exist')
      cy.get('button').contains('erika40').click()
      cy.get('[id="Logout-1--Streamline-Core.svg"]').should('exist')
      cy.intercept('DELETE', '/ssr/main/api/auth/logout').as('logout')
      cy.get('[id="Logout-1--Streamline-Core.svg"]').parents('li').click()
      cy.wait(100)
      cy.wait('@logout').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })   
      cy.log('Test completed')
    })
  })
})

describe('Vendor Admin | logged with Admin credentials', () => {
    
  beforeEach(() => {
    login('Admin Section', 'testsalon','testsalon1o')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe.only('Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {
    
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
      let staff = "Zara staff"
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
      let staff = "Zara staff"
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
      let staff = "Zara staff"
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
      cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).should('be.visible')
      cy.xpath(`//h2[text()="Edit Appointment"]/parent::div/following-sibling::div/div/div/div/div/button[text()="Change customer"]`).click()
      cy.wait(1000)
    })
  })

  describe('Vendor Admin | Staff/Staff Members| logged with Admin credentials', () => {
    
    it('Verify it is possible to access the new staff section - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.log('Test completed')
    })
  
    it('Verify after clicking "ADD NEW" the New Staff modal is display - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(1000)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to access the new staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible')
      cy.get('[aria-label="Staff"]').click()
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.get('div').contains('Select').should('be.visible')
      cy.get('div').contains('Select').click({force: true})
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(7000)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to add a new staff - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.get('[name="firstName"]').should('be.visible')
      cy.get('[name="firstName"]').type('EritestAdmin',{force: true, delay: 100})
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Created successfully').should('be.visible')
      cy.log('Test completed')
      cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    })
        
    it('Verify it is possible to edit staff User permission From STAFF to RECEPTIONIST - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('EritestAdmin').should('be.visible')
      cy.xpath(`//td[text()="EritestAdmin"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="RECEPTIONIST"]').should('be.visible')
      cy.get('[data-value="RECEPTIONIST"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From RECEPTIONIST to READ ONLY - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('EritestAdmin').should('be.visible')
      cy.xpath(`//td[text()="EritestAdmin"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="READONLY"]').should('be.visible')
      cy.get('[data-value="READONLY"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('EritestAdmin').should('be.visible')
      cy.xpath(`//td[text()="EritestAdmin"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('EritestAdmin').should('be.visible')
      cy.xpath(`//td[text()="EritestAdmin"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="RECEPTIONIST"]').should('be.visible')
      cy.get('[data-value="RECEPTIONIST"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to delete staff - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.xpath(`//td[text()="EritestAdmin"]/following-sibling::td/button[@aria-label="Delete"]`).click()
      cy.contains('Delete Staff').should('be.visible')
      cy.contains('Are you sure you want to delete this Employee?').should('be.visible')
      cy.get('button').contains('Delete').should('be.visible')
      cy.get('button').contains('Delete').click()
      cy.contains('Deleted successfully').should('be.visible')
      cy.log('Test completed')
    })
  })

  describe('Vendor Admin | Login/logout| logged with Admin credentials', () => {
    
    it('Login into vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })
  
    it('Logout from vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.get('button').contains('testsalon').should('exist')
      cy.get('button').contains('testsalon').click()
      cy.get('[id="Logout-1--Streamline-Core.svg"]').should('exist')
      cy.intercept('DELETE', '/ssr/main/api/auth/logout').as('logout')
      cy.get('[id="Logout-1--Streamline-Core.svg"]').parents('li').click()
      cy.wait(100)
      cy.wait('@logout').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })   
      cy.log('Test completed')
    })
  })

})

describe('Vendor Admin | logged with Receptionist credentials', () => {
    
  beforeEach(() => {
    login('Receptionist Session', 'receptionist9','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })


  describe.only('Vendor Admin | Calendar | Create appointment by Clicking on the calendar | logged with Receptionist credentials', () => {

    it('Verify the New appointment modal is hidden after creating successfully an appointment  - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      let staff = "Susan "
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
    })
  
  
    it('Verify it is possible to create an appointment searching and selecting customer from vendor  - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      let staff = "Zara staff"
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
      let staff = "Zara staff"
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
  
  
    it('Verify it is possible to create an appointment over and already taken time slot - Admin Credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      let staff = "Zara staff"
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
  
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin Credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      let staff = "Naomi"
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
  
  describe('Vendor Admin | Staff/Staff Members| logged with Receptionist credentials', () => {
  
    it('Verify it is possible to access the new staff section - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.log('Test completed')
    })
  
    it('Verify after clicking "ADD NEW" the New Staff modal is display - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to access the new staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible')
      cy.get('[aria-label="Staff"]').click()
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(900)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.wait(7000)
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to add a new staff - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('ADD NEW').click()
      cy.contains('New Staff').should('be.visible')
      cy.contains('Select').should('be.visible')
      cy.contains('Select').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.get('[name="firstName"]').should('be.visible')
      cy.get('[name="firstName"]').type('Eritest1',{force: true, delay: 100})
      cy.contains('Submit').should('be.visible')
      cy.contains('Submit').click()
      cy.contains('Created successfully').should('be.visible')
      cy.log('Test completed')
      cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    })
        
    it('Verify it is possible to edit staff User permission From STAFF to RECEPTIONIST - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('Eritest1').should('be.visible')
      cy.xpath(`//td[text()="Eritest1"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="RECEPTIONIST"]').should('be.visible')
      cy.get('[data-value="RECEPTIONIST"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From RECEPTIONIST to READ ONLY - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('Eritest1').should('be.visible')
      cy.xpath(`//td[text()="Eritest1"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="READONLY"]').should('be.visible')
      cy.get('[data-value="READONLY"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('Eritest1').should('be.visible')
      cy.xpath(`//td[text()="Eritest1"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="STAFF"]').should('be.visible')
      cy.get('[data-value="STAFF"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.contains('Eritest1').should('be.visible')
      cy.xpath(`//td[text()="Eritest1"]/following-sibling::td/button[@aria-label="Edit"]`).click()
      cy.contains('Update Staff').should('be.visible')
      cy.get('#mui-component-select-role').should('be.visible')
      cy.get('#mui-component-select-role').click()
      cy.get('[data-value="RECEPTIONIST"]').should('be.visible')
      cy.get('[data-value="RECEPTIONIST"]').click()
      cy.get('button').contains('Update').should('be.visible')
      cy.get('button').contains('Update').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to delete staff - Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/staff')
      cy.wait(7000)
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.get('[aria-label="Staff"]').should('be.visible');
      cy.get('[aria-label="Staff"]').click();
      cy.url().should('include', 'https://staging.vendor.bookr-dev.com/staff')
      cy.contains('ADD NEW').should('be.visible')
      cy.xpath(`//td[text()="Eritest1"]/following-sibling::td/button[@aria-label="Delete"]`).click()
      cy.contains('Delete Staff').should('be.visible')
      cy.contains('Are you sure you want to delete this Employee?').should('be.visible')
      cy.get('button').contains('Delete').should('be.visible')
      cy.get('button').contains('Delete').click()
      cy.contains('Deleted successfully').should('be.visible')
      cy.log('Test completed')
    })
  })

  describe('Vendor Admin | Login/logout| logged with Receptionist credentials', () => {
      
    it('Login into vendor with Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })

    it('Logout from vendor with Receptionist credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.get('button').contains('receptionist9').should('exist')
      cy.get('button').contains('receptionist9').click()
      cy.get('[id="Logout-1--Streamline-Core.svg"]').should('exist')
      cy.intercept('DELETE', '/ssr/main/api/auth/logout').as('logout')
      cy.get('[id="Logout-1--Streamline-Core.svg"]').parents('li').click()
      cy.wait(100)
      cy.wait('@logout').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })   
      cy.log('Test completed')
    })
  })
})  

describe('Vendor Admin | Login/logout| logged with Read Only credentials', () => {
    
  beforeEach(() => {
    login('Readonly Session', 'readonly35','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe('Vendor Admin | Login/logout| logged with Read Only credentials', () => {
      
    it('Login into vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })
  
    it('Logout from vendor with Staff credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      cy.get('button').contains('readonly35').should('exist')
      cy.get('button').contains('readonly35').click()
      cy.get('[id="Logout-1--Streamline-Core.svg"]').should('exist')
      cy.intercept('DELETE', '/ssr/main/api/auth/logout').as('logout')
      cy.get('[id="Logout-1--Streamline-Core.svg"]').parents('li').click()
      cy.wait(100)
      cy.wait('@logout').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })   
      cy.log('Test completed')
    })
  })
})