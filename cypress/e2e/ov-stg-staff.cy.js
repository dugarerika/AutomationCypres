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

describe('Vendor Admin | logged with Staff credentials', () => {
    
  beforeEach(() => {
    login('Staff Session', 'zumba','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
  })

  afterEach(() => {
    cy.clearCookies()
  })

  
})

describe('Vendor Admin | logged with Admin credentials', () => {
    
  beforeEach(() => {
    login('Admin Section', 'artnailcorner','1234567890')
  })

  afterEach(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

  describe('Vendor Admin | Staff/Staff Members| logged with Admin credentials', () => {
    
    it('Verify it is possible to access the new staff section - Admin credentials', () => {
      cy.visit('https://staging.vendor.bookr-dev.com/calendar')
      // cy.wait(900)
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
  
    it.only('Verify it is possible to add a new staff - Admin credentials', () => {
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
        
    it.only('Verify it is possible to edit staff User permission From STAFF to RECEPTIONIST - Admin credentials', () => {
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
  
    it.only('Verify it is possible to edit staff User permission From RECEPTIONIST to READ ONLY - Admin credentials', () => {
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
  
    it.only('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
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
  
    it.only('Verify it is possible to edit staff User permission From READ ONLY to STAFF - Admin credentials', () => {
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
  
    it.only('Verify it is possible to delete staff - Admin credentials', () => {
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
})

describe('Vendor Admin | logged with Receptionist credentials', () => {
    
  beforeEach(() => {
    login('Receptionist Session', 'recep6','1234567890')
  })

  afterEach(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
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
})  

describe('Vendor Admin | Login/logout| logged with Read Only credentials', () => {
    
  beforeEach(() => {
    login('Readonly Session', 'readonly35','1234567890')
  })

  after(() => {
    cy.visit('https://staging.vendor.bookr-dev.com/auth?nativeLogout=true')
    cy.clearCookies()
  })

})