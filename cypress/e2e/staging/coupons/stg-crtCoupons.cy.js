/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require("chai")
const { faker } = require('@faker-js/faker');

// Important:  before running this test cases the product list must be empty

const randCouponCode1 = `PNK1${faker.number.int({ min: 100, max: 1000 })}`
const randCouponCode2 = `PNK2${faker.number.int({ min: 100, max: 1000 })}`
const randCouponCode3 = `PNK1${faker.number.int({ min: 100, max: 1000 })}`
const randCouponCode4 = `PNK2${faker.number.int({ min: 100, max: 1000 })}`

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
    // cy.contains('label>span','Expire Date').parent().next('div').find('input').eq(0).should('exist')
    // cy.contains('label>span','Expire Date').parent().next('div').find('input').eq(0).type(coupon_expiration)
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
    cy.login('Admin Section', Cypress.expose("Vendor6_Admin_Username_Staging"), Cypress.expose("Vendor6_Admin_Password_Staging"))
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

it('Verify it is possible access to the Coupons section', () => {
    accessToCouponSection()
})

it('Verify it is possible access to the Add Coupons form', () => {
    accessToCouponSection()
    accessToAddCouponForm()
})

// Add Couponcription form fiels validation

it.only('Verify that the Add Coupon Service & Category are NOT required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
        cy.wait(64)
    selectCouponAllService()
    cy.wait(64)
    filloutCouponInfo(randCouponCode1, randCouponCode1, 1, 1, 1)
    cy.wait(64)
    expectedMessageCreateCoupon('Coupon created successfully')
})

it('Verify that the Add Coupon Name is required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('{enter}', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it('Verify that the Add Coupon Name must be at least 3 characters', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode2, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it('Verify that the Coupon discount value is required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode3, randCouponCode3, '{enter}', 1, 1)
    expectedMessageCreateCoupon('Discount value is required')
})

it('Verify that the Add Couponcription Price must be greater than Zero', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode4, randCouponCode4, 1, 1, 1)
    expectedMessageCreateCoupon('Price must be greater or equal than 1')
})

it('Verify that the Add Couponcription Price allow decimal numbers', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo(randCouponCode2, randCouponCode2, 0.1, 1, 1)
    expectedMessageCreateCoupon('Coupon created successfully')
})

it('Verify that the Add Couponcription Description field is optional', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it('Verify that the Add Couponcription Notes field is optional', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Required')
})

it('Verify that the Add Couponcription Number of Sessions is required  ', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions is required')
})

it('Verify that the Add Couponcription Number of Sessions must be greater than 1', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be greater or equal than 1')
})

it('Verify that the Add Couponcription Number of Sessions must be an integer', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Number of sessions must be an integer')
})

it('Verify that the Add Couponcription Expiration in days is required', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Expiration time is required')
})

it('Verify that the Add Couponcription Expiration in days must be greater than 1', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Expiration time must be greater or equal than 1')
})

it('Verify that the Add Couponcription Expiration in days must be an integer', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Expiration time must be an integer')
})

it('Verify that the Add Couponcription Service: Add another service allows the user to add multiple services', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    filloutCouponInfo('12', randCouponCode1, 1, 1, 1)
    expectedMessageCreateCoupon('Couponcription created')
})

it('Verify that the Add Couponcription Service: Services can be removed ', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    selectCouponService()
    filloutCouponcriptionInfo('Couponcription linked to 4 services',9.1,3,1000,'Notes','Description')
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateCoupon('At least one service variant is required')
})

it('Verify that the Add Couponcription Service: Add another service allows the user to add multiple services', () => {
    accessToCouponSection()
    accessToAddCouponForm()
    selectCouponService()
    selectCouponService()
    filloutCouponcriptionInfo('Couponcription linked to 4 services',9.1,3,1000,'Notes','Description')
    expectedMessageCreateCoupon('Couponcription created')
})

// Edit Couponcription form fiels validation
it.skip('Verify that the Update Couponcription allows the user to remove services', () => {
    accessToCouponSection()
    accessToEditCouponForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateCoupon('Please select at least one service')
})

it.skip('Verify that the Update Couponcription Service is required', () => {
    accessToCouponSection()
    accessToEditCouponForm()
    cy.get('[data-testid="CloseIcon"]').click({ force: true })
    expectedMessageCreateCoupon('Please select at least one service')
})

// it('Verify that the Update Couponcription Name is required', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     expectedMessageCreateCoupon('Name is required')
// })

// it('Verify that the update Couponcription Name must be at least 3 characters', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo(10,10,20,30,'Notes10','Description10')
//     expectedMessageCreateCoupon('Name must be at least 3 characters')
// })

// it('Verify that the update Couponcription Price is required', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo('SubPrice Required','{enter}',2,3,'Notes','Description')
//     expectedMessageCreateCoupon('Price is required')
// })

// it('Verify that the Update Couponcription Price must be greater than Zero', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo('SubPrice greater than 0',0,2,3,'Notes','Description')
//     expectedMessageCreateCoupon('Price must be greater than 0')
// })

// it('Verify that the Update Couponcription Price allow decimal numbers', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo('SubPrice Zeropoint1',0.1,2,3,'Notes','Description')
//     expectedMessageCreateCoupon('Couponcription Updated Succesfully')
// })

// it('Verify that the Update Couponcription Description field is optional', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo('update SubDescription is optional', 0.101, 2, 3, 'Notes for Description is optional','{enter}')
//     expectedMessageCreateCoupon('Couponcription Updated Succesfully')
// })

// it('Verify that the Add Couponcription Notes field is optional', () => {
//     accessToCouponSection()
//     accessToEditCouponForm()
//     clearUpdateForm()
//     filloutCouponcriptionInfo('Update SubNotes is optional',0.1,2,3,'{enter}','Description test for Notes is optional')
//     expectedMessageCreateCoupon('Couponcription Updated Succesfully')
// })

// it('Verify that the Add Couponcription Number of Sessions is required  ', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',0.1,2,'{enter}','Notes','Description')
//     expectedMessageCreateCoupon('Number of sessions is required')
// })

// it.skip('Verify that the Add Couponcription Number of Sessions must be greater than Zero', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',0.1,2,0,'Notes','Description')
//     expectedMessageCreateCoupon('Number of sessions must be greater than 0')
// })

// it.skip('Verify that the Add Couponcription Number of Sessions must be an integer', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',10.10,2,2.1,'Notes','Description')
//     expectedMessageCreateCoupon('Number of sessions must be an integer number')
// })

// it.skip('Verify that the Add Couponcription Expiration in days is required', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',0.1,'{enter}',1000,'Notes','Description')
//     expectedMessageCreateCoupon('Expiration is required')
// })

// it.skip('Verify that the Add Couponcription Expiration in days must be greater than Zero', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',0.1,0,8,'Notes','Description')
//     expectedMessageCreateCoupon('Expiration must be greater than 0')
// })

// it.skip('Verify that the Add Couponcription Expiration in days must be an integer', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     selectCouponService()
//     filloutCouponcriptionInfo('SubNotes is optional',0.1,8.1,1000,'Notes','Description')
//     expectedMessageCreateCoupon('Expiration must be an integer number')
// })

// it.skip('Verify that the Add Couponcription Service: Add another service allows the user to add multiple services', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     selectCouponService()
//     selectCouponService()
//     selectCouponService()
//     filloutCouponcriptionInfo('Couponcription linked to 4 services',9.1,3,1000,'Notes','Description')
//     expectedMessageCreateCoupon('Couponcription created')
// })

// it.skip('Verify that the Add Couponcription Service: Services can be removed ', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     filloutCouponcriptionInfo('Couponcription linked to 4 services',9.1,3,1000,'Notes','Description')
//     cy.get('[data-testid="CloseIcon"]').click({ force: true })
//     expectedMessageCreateCoupon('Please select at least one service')
// })

// it.skip('Verify that the Add Couponcription Service: Add another service allows the user to add multiple services', () => {
//     accessToCouponSection()
//     accessToAddCouponForm()
//     selectCouponService()
//     selectCouponService()
//     filloutCouponcriptionInfo('Couponcription linked to 4 services',9.1,3,1000,'Notes','Description')
//     expectedMessageCreateCoupon('Couponcription created')
// })

})



// Verify that the Add Couponcription set Enable toggle OFF  


// Verify a Couponcription can be deleted when confirming the action.  

// Verify that after deleting a Couponcription the Couponcription list gets updated.  

// Verify a Couponcription can not be deleted when canceling the action.  


// Update Couponcription Form:

// Verify that the 'Update Couponcription' Service is required. 

// Verify that the 'Update Couponcription' Name is required. 

// Verify that the 'Update Couponcription' Name must be at least 3 characters  

// @Obafemi Joseph  It is allowing to create a Couponcription with a 1 character name

// Verify that the 'Update Couponcription' Description is an optional field 

// Verify that the 'Update Couponcription' Notes is optional field 

// Verify that the 'Update Couponcription' set Enable toggle ON 	

// Verify that the 'Update Couponcription' set Enable toggle OFF 

// Verify that the 'Update Couponcription' Price is required 

// Verify that the 'Add' Couponcription Price must be greater than 0 

// Verify that the 'Update Couponcription' Price allowed decimal number  

// Verify that the 'Update Couponcription' Number of Sessions is required 

// Verify that the 'Add' Couponcription Number of Sessions must be an integer 

// Verify that the 'Update Couponcription' Number of Sessions must be greater than Zero 

// Verify that the 'Update Couponcription' Expiration in days is required 

// Verify that the 'Add' Couponcription Expiration in days must be an integer. 

// Verify that the 'Update Couponcription' Expiration in days must be greater than Zero 

// Verify that the 'Update Couponcription' Service: dropdown matches current services available 

// Verify that the 'Update Couponcription' Service: Add another service allows the user to add multiple services 

// Verify that the 'Update Couponcription' Couponcription Service: Services are added correctly to the Couponcription	

// Verify that the 'Update Couponcription' Service: Services can be removed 

