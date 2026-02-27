// ***********************************************
// Custom Cypress Commands
// ***********************************************

// ===== Shared Helpers =====

function performSessionLogin(envKey, username, password) {
    cy.visit(Cypress.expose(envKey))
    cy.url().should('include', Cypress.expose(envKey) + 'auth')
    cy.get('[type="text"]').should('be.visible').type(username, { force: true, delay: 28 })
    cy.get('[type="password"]').should('be.visible').type(password, { force: true, delay: 28 })
    cy.intercept('POST', '/api/main/auth/login').as('sign')
    cy.xpath('//button[text()="Login"]').should('be.visible').click()
    cy.wait('@sign').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
}

// ===== Authentication =====

Cypress.Commands.add('login', (name, username, password) => {
    cy.session(name, () => {
        performSessionLogin('URL_Staging', username, password)
    })
    cy.wait(640)
    cy.visit(Cypress.expose('URL_Staging') + 'admin/calendar')
    cy.wait(5600)
    cy.get('body').then(($body) => {
        if ($body.text().includes('Welcome Back!')) {
            cy.contains('h3', 'Welcome Back!').next('button').scrollIntoView().click()
            cy.wait(4000)
        }
        if ($body.text().includes('Enable Notifications')) {
            cy.contains('button', 'Not now').click()
            cy.wait(400)
        }
    })
})

Cypress.Commands.add('loginprod', (name, username, password) => {
    cy.session(name, () => {
        performSessionLogin('URL_Production', username, password)
    })
})

Cypress.Commands.add('closeWelcomeBackBanner', () => {
    cy.document().then(doc => {
        const h3 = Array.from(doc.querySelectorAll('h3'))
            .find(el => el.textContent.includes('Welcome Back'))
        if (h3) {
            cy.wrap(h3).next('button').click()
            cy.log('Closed Welcome Back banner')
        } else {
            cy.log('Welcome Back banner not found')
        }
    })
})

Cypress.Commands.add('logout', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
})

// ===== Inventory / Products =====

Cypress.Commands.add('accessToCreateProduct', (environment = 'URL_Staging') => {
    cy.visit(Cypress.expose(environment) + 'admin/calendar')
    cy.contains('Inventory', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('Products', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('h6', 'Products', { matchCase: false }).should('exist')
    cy.contains('button', 'Add new', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('h3', 'Create product', { matchCase: false }).should('exist')
})

Cypress.Commands.add('filloutProductBasicInfo', (prod_name, prod_barcode, prod_measurement, prod_short_description, prod_description) => {
    cy.contains('button', 'Basic info', { matchCase: false }).should('exist').click({ force: true })
    cy.get('input[placeholder="Enter product name"]').should('exist').type(prod_name)
    cy.get('input[placeholder="Enter product barcode"]').should('exist').type(prod_barcode)
    cy.get('input[placeholder="Enter product measurement"]').should('exist').type(prod_measurement)
    cy.get('input[placeholder="Enter short description for your product"]').should('exist').type(prod_short_description)
    cy.contains('label>span', 'Product description', { matchCase: false })
        .parents('label').next('div').find('textarea').first()
        .should('exist').type(prod_description)
})

Cypress.Commands.add('expectedMessageCreateProduct', (product_message) => {
    cy.contains('button', 'Save', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('span', product_message, { matchCase: false }).should('exist')
})

Cypress.Commands.add('filloutProductPricingInfo', (prod_supply_price, prod_retail_price) => {
    cy.contains('button', 'Pricing', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('h6', 'Pricing', { matchCase: false }).should('exist')
    cy.contains('span', 'Supply Price', { matchCase: false }).should('exist')
    cy.contains('span', 'Retail price', { matchCase: false }).should('exist')
    cy.contains('span', 'Enable Retail Sale', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Supply Price', { matchCase: false }).parents('label').next('div').find('input').type(prod_supply_price)
    cy.contains('label>span', 'Retail price', { matchCase: false }).parents('label').next('div').find('input').type(prod_retail_price)
})

Cypress.Commands.add('filloutProductInventoryInfo', (prod_ksu, prod_stock_qty, prod_low_stock_lvl, prod_reorder_qty) => {
    cy.contains('div>button', 'Inventory', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('h6', 'Inventory').should('exist')
    cy.contains('span', 'Track stock quantity', { matchCase: false }).should('exist')
    cy.contains('label>span', 'SKU (Stock Keeping Unit)', { matchCase: false })
        .should('exist').parents('label').next('div').find('input').type(prod_ksu)
})

// ===== Inventory / Suppliers =====

Cypress.Commands.add('accessToCreateSuppliers', (environment = 'URL_Staging') => {
    cy.visit(Cypress.expose(environment) + 'admin/calendar')
    cy.contains('Inventory').should('exist').click({ force: true })
    cy.contains('Suppliers').should('exist').click({ force: true })
    cy.contains('h6', 'Suppliers').should('exist')
    cy.contains('button', 'Add New', { matchCase: false }).should('exist').click({ force: true })
    cy.contains('h3', 'Add supplier').should('exist')
})

Cypress.Commands.add('filloutSupplierForm', (sup_name, sup_description, sup_first_name, sup_last_name, sup_contact_mobile, sup_contact_email) => {
    cy.contains('h3', 'Add supplier').should('exist')
    cy.contains('h6', 'Supplier Details', { matchCase: false }).should('exist')
    cy.contains('label>span', 'Supplier name').should('exist').parent().next('div').find('input').type(sup_name)
    cy.contains('label>span', 'Supplier description').should('exist').parent().next('div').find('textarea').first().type(sup_description)
    cy.contains('label>span', 'Contact first name').should('exist').parent().next('div').find('input').type(sup_first_name)
    cy.contains('label>span', 'Contact last name').should('exist').parent().next('div').find('input').type(sup_last_name)
    cy.contains('label>span', 'Contact mobile').should('exist').parent().next('div').find('input').type(sup_contact_mobile)
    cy.contains('label>span', 'Contact email').should('exist').parent().next('div').find('input').type(sup_contact_email)
})

Cypress.Commands.add('expectedMessageCreateSupplier', (supplier_message) => {
    cy.contains('button', 'Save').should('exist').click()
    cy.wait(80)
    cy.contains('span', supplier_message).should('exist')
})

// ===== Employees =====

Cypress.Commands.add('deleteEmployee', () => {
    cy.visit(Cypress.expose('URL_Staging') + 'admin/calendar')
    cy.url().should('include', Cypress.expose('URL_Staging') + 'admin/calendar')
    cy.contains('Employees').should('exist').click({ force: true })
    cy.contains('All Employees').should('exist').click({ force: true })
    cy.contains('div', 'Employees').should('exist').click({ force: true })
    cy.get('tbody>*').should('exist').first().click({ force: true })
    cy.wait(80)
    cy.contains('Delete employee').scrollIntoView().click({ force: true })
    cy.wait(800)
    cy.contains('button', 'Delete').should('exist').click({ force: true })
    cy.contains('p', 'Are you sure you want to delete this employee?').should('exist')
        .parents('section').next('div').find('button').eq(1).click({ force: true })
    cy.contains('span', 'Employee deleted successfully').should('exist')
    cy.get('tbody').find('tr').its('length').then(count => {
        if (count) {
            cy.log(`there are ${count - 1} elements`)
        }
    })
})

Cypress.Commands.add('filloutProfileInfo', (first_name, last_name, email, order, username, password) => {
    cy.contains('span', 'First name').parent().next('div').find('input').eq(0).should('exist').type(first_name)
    cy.contains('span', 'Username').parent().next('div').find('input').eq(0).should('exist').type(username)
    cy.contains('span', 'Password').parent().next('div').find('input').eq(0).should('exist').type(password)
    cy.contains('span', 'Last name').parent().next('div').find('input').eq(0).should('exist').type(last_name)
    cy.contains('span', 'Email').parent().next('div').find('input').eq(0).should('exist').type(email)
    cy.contains('span', 'Order').parent().next('div').find('input').eq(0).should('exist').type(order)
})

Cypress.Commands.add('selectAllServices', () => {
    cy.contains('div>button', 'Profile').scrollIntoView()
    cy.contains('div>button', 'Services').click({ force: true })
    cy.contains('span', 'All Services').parent('label').find('input').click({ force: true })
})

Cypress.Commands.add('filloutCommissionsInfo', () => {
    cy.contains('div>button', 'Commission').scrollIntoView().click({ force: true })
    cy.contains('label>span', 'Service').parent().next('div').find('input').eq(0).should('exist').type('10')
})

Cypress.Commands.add('expectedMessageCreateEmployee', (product_message) => {
    cy.contains('button', 'Save').should('exist').click({ force: true })
    cy.contains('div>span', product_message).should('exist')
    cy.wait(240)
})

// ===== Customers =====

Cypress.Commands.add('deleteCustomer', () => {
    cy.visit(Cypress.expose('URL_Staging') + 'admin/calendar')
    cy.url().should('include', Cypress.expose('URL_Staging') + 'admin/calendar')
    cy.contains('Customers').click({ force: true })
    cy.get('table tbody').find('tr').eq(0).find('td').eq(7).find('span>div>svg').eq(1).click()
    cy.contains('button', 'Yes').click()
})

// ===== Calendar =====

Cypress.Commands.add('searchAppt', (staff) => {
    cy.contains(`${staff}`).parent('div').then(($div) => {
        const color = $div.attr('color')
        cy.log(color)
        cy.get(`div[color="${color}"][data-event-start]`).should('be.visible').click({ force: true })
        cy.log('Test completed')
    })
})

Cypress.Commands.add('searchTimeSlot', (staff, start_time) => {
    cy.contains(`${staff}`).parent('div').then(($div) => {
        const color = $div.attr('color')
        cy.log(color)
        cy.get(`div[data-schedule-time="${start_time}"][color="${color}"]`).should('be.visible').click({ force: true })
        cy.log('Test completed')
    })
    cy.contains('New Appointment').should('exist')
})

Cypress.Commands.add('createappt', (staff, start_time, serv) => {
    cy.searchTimeSlot(staff, start_time)
    cy.contains('label', 'Service').next('div').find('div > div > div').next('div').find('input').click().type(`${serv}{downarrow}{enter}`)
    cy.contains('Create Appointment').click({ force: true })
    cy.intercept('POST', '/api/main/vendor/bookings/cart').as('new-user')
    cy.wait('@new-user').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})

Cypress.Commands.add('searchBlockTime', (staff, start_time) => {
    cy.visit(Cypress.expose('URL_Staging'))
    cy.contains(`${staff}`).parent('div').then(($div) => {
        const color = $div.attr('color')
        cy.log(color)
        cy.xpath(`//div[@color="${color}"]/div[@class="event-time"]/span[text()="${start_time} AM"]`)
            .should('be.visible').click()
        cy.log('Test completed')
    })
    cy.contains('Appointment Details').should('be.visible')
})

Cypress.Commands.add('expectedMessageCompleteSale', (message) => {
    cy.contains('button', 'Complete Sale').scrollIntoView().click({ force: true })
    cy.contains('span', message).should('exist')
})

Cypress.Commands.add('newCheckout', (environ) => {
    cy.visit(Cypress.expose(environ) + 'admin/calendar')
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.wait(800)
    cy.contains('li', 'New Checkout').should('be.visible').click({ force: true })
    cy.contains('button', 'Walk In').should('be.visible').click({ force: true })
})

Cypress.Commands.add('addItemService', (service) => {
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.get('div[role="tablist"]').find('button').eq(0).click({ force: true })
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(service)
    cy.contains('div', service).parents('li').find('button').click({ force: true })
    cy.get('div[role="presentation"]').trigger('click')
})

Cypress.Commands.add('addItemOffer', (offer) => {
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.get('div[role="tablist"]').find('button').eq(1).click({ force: true })
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(offer)
    cy.contains('div', offer).parents('li').find('button').click({ force: true })
    cy.get('div[role="presentation"]').trigger('click')
})

Cypress.Commands.add('addItemProduct', (product) => {
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.get('div[role="tablist"]').find('button').eq(2).click({ force: true })
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(product)
    cy.contains('div', product).parents('li').find('button').click({ force: true })
    cy.get('div[role="presentation"]').trigger('click')
})

Cypress.Commands.add('addEmployee', (employee) => {
    cy.contains('button', 'Edit').should('be.visible').click({ force: true })
    cy.contains('label>span', 'Staff').parents('label').next('div').find('input').type(`${employee}{enter}{enter}`)
    cy.wait(800)
    cy.contains('button', 'Save').click({ force: true })
})

Cypress.Commands.add('addItemGiftCard', (gift) => {
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.get('div[role="tablist"]').find('button').eq(4).click()
    cy.wait(80)
    cy.contains('div', gift).parents('li').find('button').click({ force: true })
    cy.get('div[role="presentation"]').trigger('click')
})

Cypress.Commands.add('addItemSubscription', (subs) => {
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.get('div[role="tablist"]').find('button').eq(3).click()
    cy.contains('label>span', 'search').parents('label').next('div').find('input').type(subs)
    cy.contains('div', subs).parents('li').find('button').click({ force: true })
    cy.get('div[role="presentation"]').trigger('click')
})

Cypress.Commands.add('fillButton', (method) => {
    cy.contains('label', method, { matchCase: false }).parent('div').parent('div').next('div').children('.fill').find('button').click()
    cy.contains('h6', /^Total$/).next('span').then(($span) => {
        const total = $span.text().split(' ')
        cy.log(eval(total[1]))
        cy.contains('label', method).parent('div').find('input').should('have.value', eval(total[1]))
    })
})

Cypress.Commands.add('fillButtonDonwpayment', (method) => {
    cy.contains('label', method, { matchCase: false }).parent('div').parent('div').next('div').children('.fill').find('button').click()
    cy.contains('h6', /^Down Payment$/).next('span').then(($span) => {
        const total = $span.text().split(' ')
        cy.log(eval(total[1]))
        cy.contains('label', method).parent('div').find('input').should('have.value', eval(total[1]))
    })
})

Cypress.Commands.add('disableDownpaymentSwitch', () => {
    cy.contains('Amount to pay')
        .closest('div')
        .find('input[type="checkbox"]')
        .should('exist')
        .then($switch => {
            const isChecked = $switch.prop('checked')
            cy.log(`Switch checked: ${isChecked}`)
            if (isChecked) {
                cy.log('Switch is enabled. Attempting to disable it.')
                cy.wrap($switch).click({ force: true })
                cy.contains('div', 'Downpayment should be done first', { timeout: 5000 }).should('be.visible')
            } else {
                cy.log('Switch is already disabled.')
            }
        })
    cy.contains('Amount to pay')
        .closest('div')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
})

Cypress.Commands.add('checkBreakdownNoDiscount', (service, tax) => {
    const perc3 = tax / 100
    cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) => {
        const price = $h4.text().split(' ')
        cy.log(price[0])
        cy.contains('h6', 'Sub Total').next('span').then(($span0) => {
            const subtotal = $span0.text().split(' ')
            cy.log(subtotal[1])
            expect(price[0]).to.equal(subtotal[1])
        })
        cy.contains('h6', `Tax ${tax}%`).next('span').then(($span1) => {
            const taxValue = $span1.text().split(' ')
            cy.log(taxValue[1])
            const valor0 = eval(price[0]) * perc3
            expect(Math.round((valor0 + Number.EPSILON) * 10000) / 10000).to.equal(eval(taxValue[1]))
            cy.contains('h6', /^Total$/).next('span').then(($span2) => {
                const total = $span2.text().split(' ')
                cy.log(total[1])
                const valor1 = eval(price[0]) + eval(taxValue[1])
                expect(Math.round((valor1 + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
            })
        })
    })
})

Cypress.Commands.add('addPercentageDiscount', (service, percentage, tax) => {
    const perc1 = percentage / 100
    const perc2 = (100 - percentage) / 100
    const perc3 = tax / 100
    const perc4 = 1 + perc3
    cy.contains('button', 'Percentage').click()
    cy.get('input[placeholder="Type Percentage"]').type(percentage)
    cy.contains('button', 'Apply').click()
    cy.contains('span', 'Discount Applied Successfully').should('exist')
    cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) => {
        const price = $h4.text().split(' ')
        cy.log(price[0])
        cy.log(perc2)
        cy.contains('h6', 'Sub Total').next('span').then(($span0) => {
            const subtotal = $span0.text().split(' ')
            expect(price[0]).to.equal(subtotal[1])
        })
        cy.contains('h6', 'Discount').next('span').then(($span1) => {
            const discount = $span1.text().split(' ')
            const actual = +(price[0] * eval(perc1)).toFixed(2)
            const expected = +eval(discount[1]).toFixed(2)
            expect(actual).to.equal(expected)
        })
        cy.contains('h6', `Tax ${tax}%`).next('span').then(($span2) => {
            const taxValue = $span2.text().split(' ')
            cy.log(taxValue)
            const valor0 = eval(price[0]) * perc2 * perc3
            expect(Math.round((valor0 + Number.EPSILON) * 10000) / 10000).to.equal(eval(taxValue[1]))
        })
        cy.contains('h6', /^Total$/).next('span').then(($span3) => {
            const total = $span3.text().split(' ')
            cy.log(total[1])
            const valor1 = eval(price[0]) * perc2 * perc4
            expect(Math.round((valor1 + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
        })
    })
})

Cypress.Commands.add('removeItem', (service, info) => {
    const cadena = 'Are you sure you want to delete this item?'
    const regex = new RegExp(service + '$', 'i')
    cy.contains('h6', regex).parents('.content').find('button').contains('Delete').click()
    cy.contains('p', cadena).parent('div').find('button').contains(info).click()
    if (info === 'Yes') {
        cy.contains('span', 'Item Updated').should('exist')
    } else {
        cy.contains('h6', regex).should('exist')
    }
})

Cypress.Commands.add('addEmptyDiscount', (discountType) => {
    cy.contains('div>button', discountType).click({ force: true })
    cy.contains('button', 'Apply').click()
    if (discountType === 'Coupon') {
        cy.contains('span', 'value is not allowed to be empty').should('exist')
    } else {
        cy.contains('span', 'value must be a number').should('exist')
    }
})

Cypress.Commands.add('addFixedDiscount', (service, fixed, tax) => {
    const regex = new RegExp(service + '$', 'i')
    cy.contains('h6', regex).parent('div').next('div').find('h4').then(($h4) => {
        const price = $h4.text().split(' ')
        cy.log(price[0])
        cy.contains('button', 'Fixed').click({ force: true })
        cy.wait(80)
        cy.get('input[placeholder="Type Amount"]').type(fixed)
        cy.contains('button', 'Apply').click()
        if (eval(price[0]) < fixed) {
            cy.contains('span', 'Discount applied is greater than cart subtotal').should('exist')
        } else {
            cy.contains('span', 'Discount Applied Successfully').should('exist')
            cy.contains('h6', 'Sub Total').next('span').then(($span0) => {
                const subtotal = $span0.text().split(' ')
                cy.log(subtotal[1])
                expect(price[0]).to.equal(subtotal[1])
            })
            cy.contains('h6', 'Discount').next('span').then(($span1) => {
                const discount = $span1.text().split(' ')
                cy.log(discount[1])
                expect(fixed).to.equal(discount[1])
            })
            cy.contains('h6', `Tax ${tax}%`).next('span').then(($span2) => {
                const taxValue = $span2.text().split(' ')
                cy.log(taxValue[1])
                const valor01 = eval((price[0] - fixed) * 0.15)
                expect(Math.round((valor01 + Number.EPSILON) * 10000) / 10000).to.equal(eval(taxValue[1]))
            })
            cy.contains('h6', /^Total$/).next('span').then(($span3) => {
                const total = $span3.text().split(' ')
                cy.log(total[1])
                const valor = eval(price[0] - fixed) * 1.15
                expect(Math.round((valor + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
            })
        }
    })
})

Cypress.Commands.add('addCouponDiscount', (service, coupon, percentage, tax) => {
    const perc1 = percentage / 100
    const perc2 = (100 - percentage) / 100
    const perc3 = tax / 100
    const perc4 = 1 + perc3
    const regex = new RegExp(service + '$', 'i')
    cy.contains('h6', regex).parent('div').next('div').find('h4').then(($h4) => {
        const price = $h4.text().split(' ')
        cy.log(price[0])
        cy.contains('button', 'Fixed').next('button', 'Coupon').click({ force: true })
        cy.wait(80)
        cy.contains('div', /^Type Coupon Code$/).next('div').find('input').type(`${coupon}{enter}`)
        cy.wait(80)
        cy.contains('button', 'Apply').click()
        cy.contains('span', 'Discount Applied Successfully').should('exist')
        cy.contains('h6', service).parent('div').next('div').find('h4').then(($h4) => {
            const price = $h4.text().split(' ')
            cy.log(price[0])
            cy.log(perc2)
            cy.contains('h6', 'Sub Total').next('span').then(($span0) => {
                const subtotal = $span0.text().split(' ')
                expect(price[0]).to.equal(subtotal[1])
            })
            cy.contains('h6', 'Discount').next('span').then(($span1) => {
                const discount = $span1.text().split(' ')
                const actual = +(price[0] * eval(perc1)).toFixed(2)
                const expected = +eval(discount[1]).toFixed(2)
                expect(actual).to.equal(expected)
            })
            cy.contains('h6', `Tax ${tax}%`).next('span').then(($span2) => {
                const taxValue = $span2.text().split(' ')
                cy.log(taxValue)
                const valor0 = eval(price[0]) * perc2 * perc3
                expect(Math.round((valor0 + Number.EPSILON) * 10000) / 10000).to.equal(eval(taxValue[1]))
            })
            cy.contains('h6', /^Total$/).next('span').then(($span3) => {
                const total = $span3.text().split(' ')
                cy.log(total[1])
                const valor1 = eval(price[0]) * perc2 * perc4
                cy.log(valor1)
                expect(Math.round((valor1 + Number.EPSILON) * 100) / 100).to.equal(eval(total[1]))
            })
        })
    })
})

Cypress.Commands.add('removeDiscount', (method) => {
    cy.contains('label', method, { matchCase: false }).parent('div').parent('div').next('div').find('button').click({ force: true })
    cy.contains('h6', 'Total').next('span').then(($span) => {
        const total = $span.text()
        cy.log(eval(total))
        cy.contains('label', method).parent('div').find('input').should('have.value', eval(total))
    })
})

Cypress.Commands.add('newBlockTime', (environment) => {
    cy.visit(Cypress.expose(environment))
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.wait(8)
    cy.contains('li', 'New Block Time').should('be.visible').click({ force: true })
    cy.contains('div>h3', 'Create Blocked Time').should('be.visible').click({ force: true })
})

Cypress.Commands.add('newAppt', (environment) => {
    cy.visit(Cypress.expose(environment))
    cy.contains('button', 'Add New').should('be.visible').click({ force: true })
    cy.wait(8)
    cy.contains('li', 'New Appointment').should('be.visible').click({ force: true })
})
