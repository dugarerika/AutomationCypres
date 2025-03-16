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
        cy.visit(Cypress.env("URL_OldVendor_Staging")+ 'auth?nativeLogout=true')
        // cy.url().should('include', Cypress.env("URL_OldVendor_Staging") + 'auth')
        cy.wait(1500)
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
        cy.wait(1000)
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
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.wait(1000)
    //cy.visit('https://vendor.bookr.co/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Production") + 'inventory')
    cy.contains('div>h6', 'Products', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Create Product').should('exist')
})

// -- This is a child command for the create product section Old Vendor STAGING--
Cypress.Commands.add('accessToCreateProductov', () => {
    //cy.visit('https://staging.vendor.bookr-dev.com/calendar')
    cy.visit(Cypress.env("URL_OldVendor_Staging") + 'calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.wait(1000)
    //cy.visit('https://staging.vendor.bookr-dev.com/inventory')
    cy.visit(Cypress.env("URL_OldVendor_Staging") + 'inventory')
    cy.contains('div>h6', 'Products', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Create Product', { matchCase: false }).should('exist')
})

Cypress.Commands.add('accessToCreateProduct', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Staging") + 'admin/calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Create product', { matchCase: false }).should('exist')
})

Cypress.Commands.add('accessToCreateProductbvprod', () => {
    cy.visit(Cypress.env("URL_BetaVendor_Production") + 'admin/calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist')
    cy.contains('Inventory', { matchCase: false }).click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist')
    cy.contains('Products', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).click({ force: true })
    cy.contains('h3', 'Create product', { matchCase: false }).should('exist')
})

// -- This is a child command for the create product section Old Vendor PRODUCTION and STAGING--
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
Cypress.Commands.add('filloutProductBasicInfo', (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
    cy.contains('button', 'Basic info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type(prod_name)
    cy.get('input[placeholder="Enter product barcode"]').should('exist')
    cy.get('input[placeholder="Enter product barcode"]').type(prod_barcode)
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type(prod_measurement)
    cy.get('input[placeholder="Enter short description for your product"]').should('exist')
    cy.get('input[placeholder="Enter short description for your product"]').type(prod_short_description)
    cy.contains('label>span', 'Product description', { matchCase: false }).parents('label').next('div').find('textarea').first().should('exist')
    cy.contains('label>span', 'Product description', { matchCase: false }).parents('label').next('div').find('textarea').first().type(prod_description)
    // cy.get('textarea[placeholder="Enter product description"]').should('exist')
    // cy.get('textarea[placeholder="Enter product description"]').type(prod_description)
})

Cypress.Commands.add('filloutProductBasicInfoov', (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
    cy.contains('button', 'Basic Info', { matchCase: false }).should('exist')
    cy.contains('button', 'Basic Info', { matchCase: false }).click({ force: true })
    cy.get('input[placeholder = "Enter product name"]').should('exist')
    cy.get('input[placeholder = "Enter product name"]').type(prod_name)
    cy.get('input[placeholder="Enter product barcode"]').should('exist')
    cy.get('input[placeholder="Enter product barcode"]').type(prod_barcode)
    cy.get('input[placeholder="Enter product measurement"]').should('exist')
    cy.get('input[placeholder="Enter product measurement"]').type(prod_measurement)
    cy.get('input[placeholder="Enter short description for your product"]').should('exist')
    cy.get('input[placeholder="Enter short description for your product"]').type(prod_short_description)
    cy.contains('label>span', 'Product description', { matchCase: false }).parents('label').next('div').find('textarea').first().should('exist')
    cy.contains('label>span', 'Product description', { matchCase: false }).parents('label').next('div').find('textarea').first().type(prod_description)
    // cy.get('textarea[placeholder="Enter product description"]').should('exist')
    // cy.get('textarea[placeholder="Enter product description"]').type(prod_description)
})

Cypress.Commands.add('expectedMessageCreateProduct', (product_message) => {
    cy.contains('button', 'Save', { matchCase: false }).should('exist')
    cy.contains('button', 'Save', { matchCase: false }).click({ force: true })
    cy.contains('span', product_message, { matchCase: false }).should('exist')
})

Cypress.Commands.add('filloutProductPricingInfo', (prod_supply_price, prod_retail_price) =>{
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('button', 'Pricing', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Retail price', { matchCase: false }).should('exist')
    cy.contains('span', 'Enable Retail Sale', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Supply Price', { matchCase: false }).parents('label').next('div').find('input').type(prod_supply_price)
    cy.contains('label>span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Retail price', { matchCase: false }).parents('label').next('div').find('input').type(prod_retail_price)
})

Cypress.Commands.add('filloutProductInventoryInfo', (prod_ksu, prod_stock_qty, prod_low_stock_lvl, prod_reorder_qty) =>{
    cy.contains('div>button', 'Inventory' , { matchCase: false }).should('exist')
    cy.contains('div>button', 'Inventory', { matchCase: false }).click({ force: true })
    cy.contains('h6', 'Inventory').should('exist')
    cy.contains('span', 'Track stock quantity', { matchCase: false }).should('exist')
    cy.contains('label>span', 'SKU (Stock Keeping Unit)', { matchCase: false }).should('exist')
    cy.contains('label>span', 'SKU (Stock Keeping Unit)', { matchCase: false }).parents('label').next('div').find('input').type(prod_ksu)
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
    cy.contains('label>span', 'Supplier name').should('exist')
    cy.contains('label>span', 'Supplier name').parent().next('div').find('input').type(sup_name)
    cy.contains('label>span', 'Supplier description').should('exist')
    cy.contains('label>span', 'Supplier description').parent().next('div').find('textarea').first().type(sup_description)
    cy.contains('label>span', 'Contact first name').should('exist')
    cy.contains('label>span', 'Contact first name').parent().next('div').find('input').type(sup_first_name)
    cy.contains('label>span', 'Contact last name').should('exist')
    cy.contains('label>span', 'Contact last name').parent().next('div').find('input').type(sup_last_name)
    cy.contains('label>span', 'Contact mobile').should('exist')
    cy.contains('label>span', 'Contact mobile').parent().next('div').find('input').type(sup_contact_mobile)
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
    cy.contains('span','First name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','First name').parent().next('div').find('input').eq(0).type(first_name)
    cy.contains('span','Username').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Username').parent().next('div').find('input').eq(0).type(username)
    cy.contains('span','Password').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Password').parent().next('div').find('input').eq(0).type(password)
    cy.contains('span','Last name').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Last name').parent().next('div').find('input').eq(0).type(last_name)
    cy.contains('span','Email').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Email').parent().next('div').find('input').eq(0).type(email)
    cy.contains('span','Order').parent().next('div').find('input').eq(0).should('exist')
    cy.contains('span','Order').parent().next('div').find('input').eq(0).type(order)
})


Cypress.Commands.add('selectAllServices', () => {
    cy.contains('div>button', 'Profile').scrollIntoView()
    cy.contains('div>button', 'Services').click({force: true})
    cy.contains('span','All Services').parent('label').find('input').click({force:true})
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


Cypress.Commands.add('expectedMessageCompleteSale', (message) => {
    cy.contains('button','Complete Sale').scrollIntoView()
    cy.contains('button','Complete Sale').click({force: true})
    cy.contains('span', message).should('exist')
})

Cypress.Commands.add('newCheckout', (environ) => {
    cy.visit(Cypress.env(environ) + 'admin/calendar')
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(1000)
    cy.contains('li','New Checkout').should('be.visible')
    cy.contains('li','New Checkout').click({force: true})
    cy.contains('div','Search customer..').should('be.visible')
    cy.contains('button','Walk In').should('be.visible')
    cy.contains('button','Walk In').click({force: true})
})

Cypress.Commands.add('addItemService', (name) => {
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(name)
    cy.contains('div', name).parents('li').find('button').click({force: true})
    cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
})

Cypress.Commands.add('addItemGiftCard', (name) => {
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.get('div[role="tablist"]').find('button').eq(0).click({force: true})
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(name)
    cy.contains('div', name).parents('li').find('button').click({force: true})
    cy.get('div[role="presentation"]').click({force: true}).type('{esc}')
})

Cypress.Commands.add('fillButton', (method) => {
    cy.contains('label', method, { matchCase: false }).parent('div').parent('div').next('div').find('button').click({force: true})
    cy.contains('h6','Balance').next('span').then(($span) => {
        //balance = $span.text().substring(4)
        const balance = $span.text().split(" ")
        cy.log(eval(balance[1]))
        cy.contains('label', method).parent('div').find('input').then(($input) => {
            const money = $span.text()
            cy.log(money)
        })
        cy.contains('label', method).parent('div').find('input').should('have.value',eval(balance[1]))
    })
})

Cypress.Commands.add('checkBreakdownNoDiscount', (service) => {
        cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) =>{
            const price = $h4.text().split(" ")
            cy.log(price[0])
            cy.contains('h6','Sub Total').next('span').then(($span0) => {
                const subtotal = $span0.text().split(" ")
                cy.log(subtotal[1])
                expect(price[0]).to.equal(subtotal[1])
            })
            cy.contains('h6','Tax 15%').next('span').then(($span1) => {
                const tax = $span1.text().split(" ")
                cy.log(tax[1])
                expect(price[0]*0.15).to.equal(eval(tax[1]))
            
                cy.contains('h6', /^Total$/).next('span').then(($span2) => {
                    const total = $span2.text().split(" ")
                    cy.log(total[1])
                    expect(eval(price[0]) + eval(tax[1])).to.equal(eval(total[1]))
                })
            })
        })
})

Cypress.Commands.add('addPercentageDiscount', (service,percentage) => {
    const perc1 = percentage/100
    const perc2 = (100 - percentage)/100
    cy.contains('button','Percentage').click()
    cy.get('input[placeholder="Type Percentage"]').type(percentage)
    cy.contains('button','Apply').click()
    cy.contains('span', "Discount Applied Successfully").should('exist')
    cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) =>{
        const price = $h4.text().split(" ")
        cy.log(price[0])
        cy.contains('h6','Sub Total').next('span').then(($span0) => {
            const subtotal = $span0.text().split(" ")
            cy.log(subtotal[1])
            expect(price[0]).to.equal(subtotal[1])
        })
        cy.contains('h6','Discount').next('span').then(($span1) => {
            const discount = $span1.text().split(" ")
            cy.log(discount[1])
            expect(price[0]*eval(perc1)).to.equal(eval(discount[1]))
        })
        cy.contains('h6','Tax 15%').next('span').then(($span2) => {
            const tax = $span2.text().split(" ")
            cy.log(tax)
            expect(price[0]*perc2*0.15).to.equal(eval(tax[1]))
        })
        cy.contains('h6', /^Total$/).next('span').then(($span3) => {
            const total = $span3.text().split(" ")
            cy.log(total[1])
            const valor = eval(price[0])*perc2*1.15
            expect(Math.round((valor + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
        })
    })
})

Cypress.Commands.add('removeService', (service, info) => {
    const cadena = 'Are you sure you want to delete this item?'
    const regex = new RegExp(service+'$', 'i')
    cy.contains('h6', regex).parents('.content').find('button').contains('Delete').click()
    cy.contains('p',cadena).parent('div').find('button').contains(info).click()
    if (info == 'Yes') {
        cy.contains('span', "Item Updated").should('exist')
    } else {
        cy.contains('h6', regex).should('exist')
    }
})


Cypress.Commands.add('addEmptyDiscount', (discountType) => {
    cy.contains('div>button', discountType).click({force: true})
    cy.contains('button','Apply').click()
    if (discountType == 'Coupon') {
        cy.contains('span', 'value is not allowed to be empty').should('exist')
    } else {
        cy.contains('span', 'value must be a number').should('exist')
    }
})

Cypress.Commands.add('addFixedDiscount', (service, fixed) => { 
    const regex = new RegExp(service+'$', 'i')
    cy.contains('h6', regex).parent('div').next('div').find('h4').then(($h4) =>{
        const price = $h4.text().split(" ")
        cy.log(price[0])
    cy.contains('button','Fixed').click({force: true})
    cy.wait(100)
    cy.get('input[placeholder="Type Amount"]').type(fixed)
    cy.contains('button','Apply').click()
    if (eval(price[0])<fixed) {
        cy.contains('span', "Discount applied is greater than cart subtotal").should('exist')
      } else {
        cy.contains('span', "Discount Applied Successfully").should('exist')
        cy.contains('h6','Sub Total').next('span').then(($span0) => {
            const subtotal = $span0.text().split(" ")
            cy.log(subtotal[1])
            expect(price[0]).to.equal(subtotal[1])
        })
        cy.contains('h6','Discount').next('span').then(($span1) => {
            const discount = $span1.text().split(" ")
            cy.log(discount[1])
            expect(fixed).to.equal(discount[1])
        })
        cy.contains('h6','Tax 15%').next('span').then(($span2) => {
            const tax = $span2.text().split(" ")
            cy.log(tax[1])
            expect((price[0] - fixed)*0.15).to.equal(eval(tax[1]))
        })
        cy.contains('h6', /^Total$/).next('span').then(($span3) => {
            const total = $span3.text().split(" ")
            cy.log(total[1])
            const valor = eval(price[0]-fixed)*1.15
            expect(Math.round((valor + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
        })
      }
    })
})



// Cypress.Commands.add('addCouponDiscount', (coupon) => {
//     let discount
//     let price
//     let subtotal
//     let tax
//     let total
//     let perc1 = percentage/100
//     cy.contains('button','Percentage').click()
//     cy.get('input[placeholder="Type Percentage"]').type(percentage)
//     cy.contains('button','Apply').click()
//     cy.contains('span', "Discount Applied Successfully").should('exist')
//     cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) =>{
//         price = $h4.text().split(" ")
//         cy.log(price[0])
//         cy.contains('h6','Sub Total').next('span').then(($span0) => {
//             subtotal = $span0.text().split(" ")
//             cy.log(subtotal[1])
//             expect(price[0]).to.equal(subtotal[1])
//         })
//         cy.contains('h6','Discount').next('span').then(($span1) => {
//             discount = $span1.text().split(" ")
//             cy.log(discount[1])
//             expect(price[0]*eval(perc1)).to.equal(discount[1])
//         })
//         cy.contains('h6','Tax 15%').next('span').then(($span2) => {
//             tax = $span2.text().split(" ")
//             cy.log(tax)
//             expect(price[0]*0.15).to.equal(eval(tax[1]))
//         })
//         cy.contains('h6', /^Total$/).next('span').then(($span3) => {
//             total = $span3.text().split(" ")
//             cy.log(total)
//             expect(eval(price[0]) + eval(tax[1])).to.equal(eval(total[1]))
//         })
//     })
// })

Cypress.Commands.add('remove discount', (method) => {
    let balance
    let money
    cy.contains('label', method, { matchCase: false }).parent('div').parent('div').next('div').find('button').click({force: true})
    cy.contains('h6','Balance').next('span').then(($span) => {
        //balance = $span.text().substring(4)
        balance = $span.text()
        cy.log(eval(balance))
        cy.contains('label', method).parent('div').find('input').then(($input) => {
            money = $span.text()
            cy.log(money)
        })
        cy.contains('label', method).parent('div').find('input').should('have.value',eval(balance))
    })
})

Cypress.Commands.add('newBlockTime', (environment) => {
    cy.visit(Cypress.env(environment))
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(10)
    cy.contains('li','New Block Time').should('be.visible')
    cy.contains('li','New Block Time').click({force: true})
    cy.contains('div>h3','Create Blocked Time').should('be.visible')
    cy.contains('div>h3','Create Blocked Time').click({force: true})
})


Cypress.Commands.add('newAppt', (environment) => {
    cy.visit(Cypress.env(environment))
    cy.contains('button','Add New').should('be.visible')
    cy.contains('button','Add New').click({force: true})
    cy.wait(10)
    cy.contains('li','New Appointment').should('be.visible')
    cy.contains('li','New Appointment').click({force: true})
})
// --------------------------------- Promotions/Offers section

// const expectedMessageCreateOffer = (offer_message) => {
//     cy.contains('button', 'Save').should('exist')
//     cy.contains('button', 'Save').click({ force: true })
//     cy.contains('span', offer_message_message).should('exist')
// }

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })