<<<<<<< HEAD
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.wait(900)
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

describe('Vendor Admin | logged with Admin credentials', () => {
    
  beforeEach(() => {
    login('Admin Section', 'testsalon','testsalon1o')
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe.only('Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {
    
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Susan "
      let start_time = "07:00"
      let color
      cy.get('.tool-datepicker-next').should('be.visible')
      cy.get('.tool-datepicker-next').click()
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
      let staff = "Oba Femi"
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an ovelap appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Oba Femi"
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
      let staff = "Oba Femi"
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('button','Continue').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      }) 
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin Credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "joy"
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
      cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
      cy.contains('Create Appointment').click({force: true})
      cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.contains('New Appointment').should('not.be.visible')  
    })
  
    it('Verify The edit appointment modal is display after clicking on Edit booking button - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(900)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.log('Test completed')
    })

    it('Verify it is possible to access the new staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(900)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.log('Test completed')
    })
  
    it('Verify after clicking "ADD NEW" the New Staff modal is display - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('role must be one of the following values: staff, receptionist, readonly').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to add a new staff - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Created successfully').should('be.visible')
      cy.log('Test completed')
      cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    })
        
    it('Verify it is possible to edit staff User permission From STAFF to RECEPTIONIST - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From RECEPTIONIST to READ ONLY - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to delete staff - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Deleted successfully').should('be.visible')
      cy.log('Test completed')
    })
  })

  describe('Vendor Admin | Login/logout| logged with Admin credentials', () => {
    
    it('Login into vendor with Staff credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })
  
    it('Logout from vendor with Staff credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
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
=======
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")

const login = (name, username, password) => {
  cy.session(name,() => {
    cy.visit('https://beta.vendor.bookr-dev.com/')
    cy.wait(900)
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

describe('Vendor Admin | logged with Admin credentials', () => {
    
  beforeEach(() => {
    login('Admin Section', 'testsalon','testsalon1o')
  })

  afterEach(() => {
    // cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe.only('Vendor Admin | Calendar | Create appointments by Clicking on the calendar| logged with Admin credentials', () => {
    
    it('Verify the New appointment modal is hidden after creating successfully an appointment - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Oba Femi"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Oba Femi"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "Oba Femi"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "joy"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      let staff = "emmanuel kuye"
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
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(900)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.log('Test completed')
    })

    it('Verify it is possible to access the new staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(900)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.log('Test completed')
    })
  
    it('Verify after clicking "ADD NEW" the New Staff modal is display - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('role must be one of the following values: staff, receptionist, readonly').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.wait(1000)
      cy.contains('span','Employees').parents('button').should('exist')
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify that user permission is require when creating a new staff through the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('User permission must be one of the following values: RECEPTIONIST, STAFF, READONLY').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify first name is a require field in the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify Last name is a optional field in the New Staff form - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Please enter a first name').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to add a new staff - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Created successfully').should('be.visible')
      cy.log('Test completed')
      cy.visit('https://beta.vendor.bookr-dev.com/auth?nativeLogout=true')
    })
        
    it('Verify it is possible to edit staff User permission From STAFF to RECEPTIONIST - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From RECEPTIONIST to READ ONLY - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Updated successfully').should('be.visible')
      cy.log('Test completed')
    })
  
    it('Verify it is possible to delete staff - Admin credentials', () => {
      cy.contains('span','Employees').parents('button').click()
      cy.url().should('include', 'https://beta.vendor.bookr-dev.com/admin/employees')
      cy.xpath('//button[text()="Add"]').should('be.visible')
      cy.xpath('//button[text()="Add"]').click()
      cy.contains('h3', 'Add team member').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="First Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Last Name"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Username"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').should('be.visible')
      cy.xpath('//span[text()="Password"]/parent::label/following-sibling::div/div/input').type('username', {force: true, delay: 60})
      cy.get('select').select('Staff')
      cy.contains('button','Save').should('be.visible')
      cy.contains('button','Save').click()
      cy.contains('Deleted successfully').should('be.visible')
      cy.log('Test completed')
    })
  })

  describe('Vendor Admin | Login/logout| logged with Admin credentials', () => {
    
    it('Login into vendor with Staff credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
      cy.contains('Calendar').should('exist')
      cy.log('Test completed')
    })
  
    it('Logout from vendor with Staff credentials', () => {
      cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
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
>>>>>>> 95350d11a1cb4cf6452c745d36981937f9064e37
