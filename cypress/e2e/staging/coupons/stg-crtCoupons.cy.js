/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randCouponCode1 = `PNK1${faker.number.int({ min: 1, max: 100 })}`
const randCouponCode2 = `PNK2${faker.number.int({ min: 1, max: 100 })}`
const randCouponCode3 = `PNK1${faker.number.int({ min: 1, max: 100 })}`
const randCouponCode4 = `PNK2${faker.number.int({ min: 1, max: 100 })}`

const expectedMessageCreateCoupon = (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
}

const filloutCouponInfo = (coupon_name, coupon_code, coupon_value, coupon_limit) => {
    cy.contains('label>span','Coupon Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Coupon Name').parent().next('div').find('input').eq(0).type(coupon_name)
    cy.contains('label>span','Coupon Code').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Coupon Code').parent().next('div').find('input').eq(0).type(coupon_code)
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).type(coupon_value)
    cy.contains('label>span','Limit', { matchCase: false }).parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Limit', { matchCase: false }).parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Limit', { matchCase: false }).parent().next('div').find('input').eq(0).type(coupon_limit)
}

const accessToCouponSection = () => {
    cy.visit(Cypress.expose("URL_Staging") + 'auth')
    cy.contains('button>span','Promotions').should('exist')
    cy.contains('button>span','Promotions').click({ force: true })
    cy.contains('li>button','Coupons').should('exist')
    cy.contains('li>button','Coupons').click({ force: true })
    cy.contains('h6','Coupons').should('exist')
}

const accessToAddCouponForm = () => {
    // cy.contains('h6','Coupons').parent().next('div').find('button').should('exist')
    cy.contains('button','+ Add New Coupon', { matchCase: false }).click({ force: true })
    cy.contains('button','+ Add New Coupon', { matchCase: false }).should('exist')
}

const selectCouponAllService = () => {
    cy.contains('span','All Services')
        .parent('label')
        .find('input[type="checkbox"]')
        .should('exist')
        .then($switch => {
            const isChecked = $switch.prop('checked')
            // cy.log(`Switch checked: ${isChecked}`)
            // if (isChecked) {
            //     cy.log('Switch is enabled. Attempting to disable it.')
                cy.wrap($switch).click({ force: true })
                        cy.wait(64)
            // } else {
            //     cy.log('Switch is already disabled.')
            // }
        })
}

const accessToEditCouponForm = () => {
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
}

const clearUpdateForm = () => {
    cy.contains('label>span','Coupon Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Coupon Name').parent().next('div').find('input').eq(0).clear()
    cy.contains('label>span','Coupon Code').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Coupon Code').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Promotion Value').parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Expire Date', { matchCase: false }).parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Expire Date', { matchCase: false }).parent().next('div').find('input').eq(0).clear({ force: true })
    cy.contains('label>span','Limit').parent().next('div').find('textarea').eq(0).should('exist')
    cy.contains('label>span','Limit').parent().next('div').find('textarea').eq(0).clear({ force: true })
}

describe('Staging - Vendor Admin:PINKDOOR | Promotions/Coupons | Create Coupons| logged with Admin credentials', () => {

beforeEach(() => {
    cy.login('Admin Section', Cypress.expose("Vendor7_Admin_Username_Staging"), Cypress.expose("Vendor7_Admin_Password_Staging"))
    // cy.contains('h3','Welcome Back!').next('button').click()
    cy.get('body').then(($body) => {
        if ($body.text().includes('Welcome Back!')) {
            cy.contains('h3', 'Welcome Back!').next('button').click()
            cy.wait(64)
        }
    })
    cy.wait(64)
})

afterEach(() => {
    cy.clearCookies()
})

it.only('Verify it is possible access to the Coupons section', () => {
    accessToCouponSection()
})

it.only('Verify it is possible access to the Add Coupons form', () => {
    accessToCouponSection()
    accessToAddCouponForm()
})

// Add Coupon form fiels validation

it.only('Verify that the Add Coupon Category are NOT required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    cy.wait(64)
    selectCouponAllService()
    cy.wait(64)
    filloutCouponInfo(`SERV${randCouponCode1}`, randCouponCode1, 1, 1, 1)
    cy.wait(64)
    expectedMessageCreateCoupon('Coupon created successfully')
})

it.only('Verify that the Add Coupon Service & Category are NOT required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
        cy.wait(64)
    cy.wait(64)
    filloutCouponInfo(`SERV${randCouponCode2}`, randCouponCode2, 1, 1, 1)
    cy.wait(64)
    expectedMessageCreateCoupon('Coupon created successfully')
})

it.only('Verify that the Add Coupon Name is required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('{enter}', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it.only('Verify that the Coupon discount value is required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode3, randCouponCode3, '{enter}', 1, 1)
    expectedMessageCreateCoupon('Discount value is required')
})

it.only('Verify that the coupon Price must be greater than Zero', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode4, randCouponCode4, -1, 1, 1)
    expectedMessageCreateCoupon('Promotion value must be greater than 0')
})

it.only('Verify that the Add Coupon Price allow decimal numbers', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode2, randCouponCode2, 0.1, 1, 1)
    expectedMessageCreateCoupon('Coupon created successfully')
})

it.only('Verify that the it is possible to Add Coupon Fixed Price ', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it.skip('Verify that the Add Coupon limit is Zero by default', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it.skip('Verify that the Add Coupon setting like Public, Unlimited Used per Client and Booking Date are set off by default  ', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions is required')
})

it.skip('Verify that the Add Coupon allow to create a coupona as Public', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be greater or equal than 1')
})

it.skip('Verify that the Add Coupon allow to create a coupon with Limit the Promotion to an Specific date', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be greater or equal than 1')
})

it.skip('Verify that the Add Coupon allow to create a coupon with Unlimited use per Client', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be greater or equal than 1')
})

it.skip('Verify that the Add Coupon allow to create a coupon with all the toggles enable', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be greater or equal than 1')
})

// Edit Coupon form fiels validation
it.skip('Verify that the Update Coupon allows the user to remove services', () => {
    accessToCouponSection()
    accessToEditCouponForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateCoupon('Please select at least one service')
})

it.skip('Verify that the Update Coupon Service is required', () => {
    accessToCouponSection()
    accessToEditCouponForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateCoupon('Please select at least one service')
})

})



// Verify that the Add Coupon set Enable toggle OFF  


// Verify a Coupon can be deleted when confirming the action.  

// Verify that after deleting a Coupon the Coupon list gets updated.  

// Verify a Coupon can not be deleted when canceling the action.  


// Update Coupon Form:

// Verify that the 'Update Coupon' Service is required. 

// Verify that the 'Update Coupon' Name is required. 

// Verify that the 'Update Coupon' Name must be at least 3 characters  

// @Obafemi Joseph  It is allowing to create a Coupon with a 1 character name

// Verify that the 'Update Coupon' Description is an optional field 

// Verify that the 'Update Coupon' Notes is optional field 

// Verify that the 'Update Coupon' set Enable toggle ON 	

// Verify that the 'Update Coupon' set Enable toggle OFF 

// Verify that the 'Update Coupon' Price is required 

// Verify that the 'Add' Coupon Price must be greater than 0 

// Verify that the 'Update Coupon' Price allowed decimal number  

// Verify that the 'Update Coupon' Number of Sessions is required 

// Verify that the 'Add' Coupon Number of Sessions must be an integer 

// Verify that the 'Update Coupon' Number of Sessions must be greater than Zero 

// Verify that the 'Update Coupon' Expiration in days is required 

// Verify that the 'Add' Coupon Expiration in days must be an integer. 

// Verify that the 'Update Coupon' Expiration in days must be greater than Zero 

// Verify that the 'Update Coupon' Service: dropdown matches current services available 

// Verify that the 'Update Coupon' Service: Add another service allows the user to add multiple services 

// Verify that the 'Update Coupon' Coupon Service: Services are added correctly to the Coupon	

// Verify that the 'Update Coupon' Service: Services can be removed 

