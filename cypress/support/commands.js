// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command to log into the Beta Vendor STAGING --
Cypress.Commands.add('login', (name, username, password) => {
    cy.session(name,() => {
        cy.visit(Cypress.env("URL_BetaVendor_Staging"))
        cy.url().should('include', Cypress.env("URL_BetaVendor_Staging") + 'auth')
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
})

// -- This is a parent command to log into the Beta Vendor PRODUCTION --
Cypress.Commands.add('loginprod', (name, username, password) => {
    cy.session(name,() => {
        cy.visit(Cypress.env("URL_BetaVendor_Production"))
        cy.url().should('include', Cypress.env("URL_BetaVendor_Production") + 'auth')
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
})

// -- This is a parent command to login into the Old Vendor STAGING--
Cypress.Commands.add('loginov', (name, username, password) => {
    cy.session(name,() => {
        cy.visit(Cypress.env("URL_OldVendor_Staging"))
        cy.url().should('include', Cypress.env("URL_OldVendor_Staging") + 'auth')
        cy.wait(900)
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.xpath('//button[text()="Sign in"]').should('be.visible');
        cy.get('#username').click().type(username, {force: true, delay: 80})
        cy.get('#password').click().type(password,{force: true, delay: 80})
        cy.intercept('POST', '/ssr/main/api/auth/login').as('sign')
        cy.get('button').contains('Sign in').click()
        cy.wait(1000)
        cy.wait('@sign').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })          
    })
})

// -- This is a parent command to login into the Old Vendor PRODUCTION--
Cypress.Commands.add('loginovprd', (name, username, password) => {
    cy.session(name,() => {
        //cy.visit('https://vendor.bookr.co/auth?nativeLogout=true')
        cy.visit(Cypress.env("URL_OldVendor_Production") + 'auth?nativeLogout=true')
        cy.wait(900)
        // cy.get('#username').should('be.visible');
        // cy.get('#password').should('be.visible');
        cy.xpath('//button[text()="Sign in"]').should('be.visible');
        cy.get('#username').click().type(username, {force: true, delay: 80})
        cy.get('#password').click().type(password,{force: true, delay: 80})
        cy.intercept('POST', '/ssr/main/api/auth/login').as('sign')
        cy.get('button').contains('Sign in').click()
        cy.wait(1000)
        cy.wait('@sign').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })          
    })
})

// -- This is a parent command to logout from the Beta Vendor STAGGING --
Cypress.Commands.add('logout', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
})

// ------------------------------ Inventory/ Products Section --------------------------------
// -- This is a child command for the create product section Old Vendor PRODUCTION--
Cypress.Commands.add('accessToCreateProductovprod', () => {
    //cy.visit('https://vendor.bookr.co/calendar')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.wait(1000)
    //cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('div>h6', 'Products').should('exist')
    cy.contains('button', 'Add New').should('exist')
    cy.contains('button', 'Add New').click({ force: true })
    cy.contains('h3', 'Create Product').should('exist')
})


// -- This is a child command for the create product section Old Vendor STAGING--
Cypress.Commands.add('accessToCreateProductov', () => {
    //cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    cy.visit(Cypress.env("URL_OldVendor_Staging") + 'calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.wait(1000)
    //cy.visit('https://staging.vendor.bookr-dev.com/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Staging") + 'inventory')
    cy.contains('div>h6', 'Products').should('exist')
    cy.contains('button', 'Add New').should('exist')
    cy.contains('button', 'Add New').click({ force: true })
    cy.contains('h3', 'Create Product').should('exist')
})


Cypress.Commands.add('accessToCreateProduct', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.contains('button', 'Add New').should('exist')
    cy.contains('button', 'Add New').click({ force: true })
    cy.contains('h3', 'Create Product').should('exist')
})

Cypress.Commands.add('accessToCreateProductbvprod', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Inventory').should('exist')
    cy.contains('Inventory').click({ force: true })
    cy.contains('Products').should('exist')
    cy.contains('Products').click({ force: true })
    cy.contains('h6', 'Products').should('exist')
    cy.contains('button', 'Add New').should('exist')
    cy.contains('button', 'Add New').click({ force: true })
    cy.contains('h3', 'Create Product').should('exist')
})

// -- This is a child command for the create product section Old Vendor PRODUCTION and STAGING--
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
Cypress.Commands.add('filloutProductBasicInfo', (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
    cy.contains('button', 'Basic Info').should('exist')
    cy.contains('button', 'Basic Info').click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type(prod_name)
    cy.get('input[placeholder="Enter product barcode e.g 123456789"]').should('exist')
    cy.get('input[placeholder="Enter product barcode e.g 123456789"]').type(prod_barcode)
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type(prod_measurement)
    cy.get('input[placeholder="Enter short description of the product"]').should('exist')
    cy.get('input[placeholder="Enter short description of the product"]').type(prod_short_description)
    cy.contains('label>span', 'Product Description').parents('label').next('div').find('textarea').first().should('exist')
    cy.contains('label>span', 'Product Description').parents('label').next('div').find('textarea').first().type(prod_description)
    // cy.get('textarea[placeholder="Enter product description"]').should('exist')
    // cy.get('textarea[placeholder="Enter product description"]').type(prod_description)
})

Cypress.Commands.add('expectedMessageCreateProduct', (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('span', product_message).should('exist')
})

Cypress.Commands.add('filloutProductPricingInfo', (prod_supply_price, prod_retail_price) =>{
    cy.contains('button', 'Pricing').should('exist')
    cy.contains('button', 'Pricing').click({ force: true })
    cy.contains('h6', 'Pricing').should('exist')
    cy.contains('span', 'Supply Price').should('exist')
    cy.contains('span', 'Retail Price').should('exist')
    cy.contains('span', 'Enable Retail Sales').should('exist')
    cy.contains('label>span', 'Supply Price').parents('label').next('div').find('input').type(prod_supply_price)
    cy.contains('label>span', 'Supply Price').should('exist')
    cy.contains('label>span', 'Retail Price').parents('label').next('div').find('input').type(prod_retail_price)
})

Cypress.Commands.add('filloutProductInventoryInfo', (prod_ksu, prod_stock_qty, prod_low_stock_lvl, prod_reorder_qty) =>{
    cy.contains('div>button', 'Inventory').should('exist')
    cy.contains('div>button', 'Inventory').click({ force: true })
    cy.contains('h6', 'Inventory').should('exist')
    cy.contains('span', 'Track Stock Quantity').should('exist')
    cy.contains('label>span', 'SKU (Stock Keeping Unit)').should('exist')
    cy.contains('label>span', 'SKU (Stock Keeping Unit)').parents('label').next('div').find('input').type(prod_ksu)
})

// ------------------------------ Inventory/Supppliers Section --------------------------------

Cypress.Commands.add('accessToCreateSuppliers', () =>{
        //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
        cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
        cy.contains('Inventory').should('exist')
        cy.contains('Inventory').click({ force: true })
        cy.contains('Suppliers').should('exist')
        cy.contains('Suppliers').click({ force: true })
        cy.contains('h6', 'Suppliers').should('exist')
        cy.contains('button', 'Add New').should('exist')
        cy.contains('button', 'Add New').click({ force: true })
        cy.contains('h3', 'Add New Supplier').should('exist')
})

Cypress.Commands.add('filloutSupplierForm', (sup_name, sup_description, sup_first_name, sup_last_name, sup_contact_mobile, sup_contact_emaily) =>{
    cy.contains('h3', 'Add New Supplier').should('exist')
    cy.contains('h6', 'Supplier Details').should('exist')
    cy.contains('label>span', 'Supplier Name').should('exist')
    cy.contains('label>span', 'Supplier Name').parent().next('div').find('input').type(sup_name)
    cy.contains('label>span', 'Supplier Description').should('exist')
    cy.contains('label>span', 'Supplier Description').parent().next('div').find('textarea').first().type(sup_description)
    cy.contains('label>span', 'Contact First Name').should('exist')
    cy.contains('label>span', 'Contact First Name').parent().next('div').find('input').type(sup_first_name)
    cy.contains('label>span', 'Contact Last Name').should('exist')
    cy.contains('label>span', 'Contact Last Name').parent().next('div').find('input').type(sup_last_name)
    cy.contains('label>span', 'Contact Mobile').should('exist')
    cy.contains('label>span', 'Contact Mobile').parent().next('div').find('input').type(sup_contact_mobile)
    cy.contains('label>span', 'Contact email').should('exist')
    cy.contains('label>span', 'Contact email').parent().next('div').find('input').type(sup_contact_email)
})

Cypress.Commands.add('expectedMessageCreateSupplier', (supplier_message) =>{
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click()
    cy.wait(100)
    cy.contains('span', supplier_message).should('exist')
})

// ------------------------------ Employee Section --------------------------------
Cypress.Commands.add('deleteEmployee', () => {
    //cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    cy.url().should('include', Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('Employees').should('exist')
    cy.contains('Employees').click({ force: true })
    cy.contains('div','Employees').should('exist')
    cy.contains('div','Employees').click({ force: true })
    cy.get('tbody>*').should('exist')
    cy.get('tbody>*').first().click({ force: true })
    cy.contains('Delete Employee').scrollIntoView()
    cy.contains('Delete Employee').click({ force: true })
    cy.contains('button', 'Delete').should('exist')
    cy.contains('button', 'Delete').click({ force: true })
    cy.contains('h3', 'Delete Employee').should('exist')
    cy.contains('p', 'Are you sure you want to delete this Employee?').should('exist')
    cy.contains('p', 'Are you sure you want to delete this Employee?').parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Employee deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
      if (count) {   // not count >= 0, because 0 means no elements
        cy.log(`there are ${count - 1} elements`)
    }
    })
})

Cypress.Commands.add('filloutProfileInfo', (first_name, last_name, email, order, username, password) => {
    cy.contains('span','First Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','First Name').parent().next('div').find('input').eq(0).type(first_name)
    cy.contains('span','Username').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Username').parent().next('div').find('input').eq(0).type(username)
    cy.contains('span','Password').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Password').parent().next('div').find('input').eq(0).type(password)
    cy.contains('span','Last Name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Last Name').parent().next('div').find('input').eq(0).type(last_name)
    cy.contains('span','Email').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Email').parent().next('div').find('input').eq(0).type(email)
    cy.contains('span','Order').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Order').parent().next('div').find('input').eq(0).type(order)
})


Cypress.Commands.add('filloutServicesInfo', () => {
    cy.contains('div>button', 'Profile').scrollIntoView()
    cy.contains('div>button', 'Services').click({force: true})
    cy.contains('span','All services').parent('label').find('input').click({force:true})
})

Cypress.Commands.add('filloutCommissionsInfo', () => {
    cy.contains('div>button', 'Commissions').scrollIntoView()
    cy.contains('div>button', 'Commissions').click({force: true})
    cy.contains('label>span','Service').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('label>span','Service').parent().next('div').find('input').eq(0).type('10')
})

Cypress.Commands.add('expectedMessageCreateEmployee', (product_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
    cy.wait(300)
})

// ------------------------------ Calendar Section --------------------------------

Cypress.Commands.add('searchTimeSlot', (staff,start_time) => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let color
    cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).should('be.visible')
        cy.xpath(`//div[@data-schedule-time="${start_time}" and @color="${color}"]`).click({force: true})
        cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
})


Cypress.Commands.add('searchBlockTime', (staff,start_time) => {
    cy.visit('https://beta.vendor.bookr-dev.com/admin/calendar')
    let color
    cy.contains(`${staff}`).parent('div').then(($div) => {
        color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).should('be.visible')
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`).click()
        cy.log('Test completed')
    })
    cy.contains('Appointment Details').should('be.visible')
})

// --------------------------------- Promotions/Offers section

const expectedMessageCreateOffer = (offer_message) => {
    cy.contains('button', 'Save').should('exist')
    cy.contains('button', 'Save').click({ force: true })
    cy.contains('span', offer_message_message).should('exist')
}

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })