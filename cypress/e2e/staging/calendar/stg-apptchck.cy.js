/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

describe('Staging - Beta Vendor Admin | Calendar| Appointment Checkout | logged with Admin Credentials', () => {
	beforeEach(() => {
		// cy.viewport(3840,2160)
		cy.login(
			'Admin Session',
			Cypress.env('Vendor1_Admin_Username_Staging'),
			Cypress.env('Vendor1_Admin_Password_Staging')
		);
		// cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		// cy.wait(8000);
		// cy.get('body').then(($body) => {
		// 	if ($body.text().includes('Welcome Back!')) {
		// 		cy
		// 			.contains('h3', 'Welcome Back!')
		// 			.next('button')
		// 			.scrollIntoView()
		// 			.click();
		// 		cy.wait(8000);
		// 	}
		// 	if ($body.text().includes('Enable Notifications')) {
		// 		cy.contains('button', 'Not now').click();
		// 		cy.wait(800);
		// 	}
		// });
		// cy.wait(80);
	});

	// afterEach(() => {
	// 	cy.clearCookies()
	// });

	describe('Required field during checkout', () => {
		it('Verify it is not possible to complete Appointment Checkout without adding payment', () => {
			cy.searchAppt('Susan one');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.wait(999);
			cy.contains('Change customer').should('be.visible');
			cy.expectedMessageCompleteSale(
				'Add at least one payment'
			);
		});
	});

	describe('Fillout buttons with Downpayment (it is pending gift card)', () => {
		it('Verify that clicking "Fill" for Debit sets the field with the paid Downpayment amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy.wait(99);
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.fillButtonDonwpayment('Debit');
			cy.wait(99);
		});

		it(
			'Verify that clicking "Fill" for Credit sets the field with the paid Downpayment amount for a Downpayment service.',
			() => {
				cy.searchAppt('Helen');
				cy
					.contains('button', 'Checkout')
					.scrollIntoView()
					.click();
				cy.fillButtonDonwpayment('Credit');
				cy.wait(999);
			}
		);

		it('Verify that clicking "Fill" for Cash sets the field with the paid Downpayment amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.fillButtonDonwpayment('Cash');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Other sets the field with the paid Downpayment amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.fillButtonDonwpayment('Other');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Hisabe sets the field with the paid Downpayment amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.fillButtonDonwpayment('Hisabe');
			cy.wait(999);
		});

		// Fillout buttons with Total (it is pending gift card)
		it('Verify that clicking "Fill" for Debit sets the field with the paid Total amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.disableDownpaymentSwitch();
			cy.fillButton('Debit');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Credit sets the field with the paid Total amount for a Downpayment service.', () => {
			// cy.createappt('Helen','01:00', 'Downpayment')
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.disableDownpaymentSwitch();
			cy.fillButton('Credit');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Cash sets the field with the paid Total amount for a Downpayment service.', () => {
			// cy.createappt('Helen','01:00', 'Downpayment')
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.disableDownpaymentSwitch();
			cy.fillButton('Cash');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Other sets the field with the paid Total amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.disableDownpaymentSwitch();
			cy.fillButton('Other');
			cy.wait(999);
		});

		it('Verify that clicking "Fill" for Hisabe sets the field with the paid Total amount for a Downpayment service.', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.disableDownpaymentSwitch();
			cy.fillButton('Hisabe');
			cy.wait(999);
		});
	});

	describe('Discounts', () => {
		// Discounts
		it('Verify the breakdown is correct after applying a coupon to a service ', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			// cy.addItemService('Downpayment')
			cy.addCouponDiscount(
				'Downpayment',
				'CPN2',
				'10',
				'15'
			);
		});

		it('Verify the breakdown is correct after applying a fixed discount to a service ', () => {
			// cy.createappt('Zstaff','1:00','Downpayment')
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			// cy.addItemService('Downpayment')
			cy.addFixedDiscount('Downpayment', '2.435', '15');
		});

		it('Verify the breakdown is correct after applying a percentage discount to a service ', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			// cy.addItemService('Downpayment')
			cy.addPercentageDiscount('Downpayment', '20', '15');
		});

		it('Verify it is not possible to apply a fixed discount greather than the service price', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			// cy.addItemService('Downpayment')
			cy.addFixedDiscount('Downpayment', '20', '15');
		});

		it('Verify it is not possible to apply a fixed discount when leaving the discount empty', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			// cy.addItemService('Long Hair')
			cy.wait(9000);
			cy.addEmptyDiscount('Fixed');
		});

		it('Verify it is not possible to apply a Percentage discount when leaving the discount empty', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.wait(9000);
			cy.addEmptyDiscount('Percentage');
		});

		it('Verify it is not possible to apply a Coupon discount when leaving the discount empty', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.wait(9000);
			// cy.addItemService('Long Hair')
			cy.addEmptyDiscount('Coupon');
		});
	});

	describe(' Services checkout validations', () => {
		// Services checkout validations
		it('Verify the breakdown is correct after adding a service ', () => {
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.checkBreakdownNoDiscount('Downpayment', '15');
		});

		it('Verify that it is possible to remove a service from the cart after confirming do you want to delete it', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemService('Long Hair');
			cy.removeItem('Long Hair', 'Yes');
		});

		it('Verify that it is not possible to remove a service from the cart after canceling do you want to delete it', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemService('Long Hair');
			cy.removeItem('Long Hair', 'Cancel');
		});

		it('Verify it is possible to add new service after removing one leaving the cart empty', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemService('Long Hair');
			cy.removeItem('Long Hair', 'Yes');
			cy.addItemService('Hair Cut');
		});
	});

	describe('Giftcards checkout validations', () => {
		// Giftcards checkout validations
		it('Verify the Gift card must be the only item in the cart trying to add after a service', () => {
			// cy.createappt('Helen','01:00', 'Downpayment')
			cy.searchAppt('Helen');
			cy
				.contains('button', 'Checkout')
				.scrollIntoView()
				.click();
			cy.addItemGiftCard('100 SAR Gift Card');
			cy
				.contains(
					'span',
					'Giftcards must be the only item in the cart'
				)
				.should('be.visible');
		});

		it('Verify the Gift card must be the only item in the cart trying to add a service', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemGiftCard('100 SAR Gift Card');
			cy.addItemService('Long Hair');
			cy
				.contains(
					'span',
					'Giftcards must be the only item in the cart'
				)
				.should('be.visible');
		});

		it('Verify Adjust button must be disable for Gift cards', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemGiftCard('243.48 SAR Gift Card');
			cy.contains('button', 'Adjust').should('be.disabled');
		});

		it('Verify taxes are not charged on Gift cards', () => {
			cy.newCheckout('URL_Staging');
			cy.addItemGiftCard('100 SAR Gift Card');
			cy.contains('h6', 'Tax 15%').should('not.exist');
		});
	});
	// Subscriptions checkout validations
	it('Verify after having a Subscription in the cart it is not possible to add a Giftcard', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemSubscription('Subscription B');
		cy.addItemGiftCard('100 SAR Gift Card');
		cy.wait(99);
		cy
			.contains(
				'span',
				'Giftcards must be the only item in the cart'
			)
			.should('be.visible');
	});

	// Checkout successfully - Subscriptions
	it('Verify it is possible to complete a checkout successfully for 1 Subscriptions', () => {
		cy.newCheckout('URL_Staging');
		cy
			.contains('button', 'Change customer')
			.scrollIntoView()
			.click();
		cy
			.contains('div', 'Search customer..')
			.should('be.visible');
		cy
			.contains('div', 'Search customer..')
			.next()
			.find('input')
			.type('Dugar Erika{enter}', { delay: 999 });
		cy.wait(80);
		cy.addItemSubscription('Subscription B');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
	it('Verify it is possible to complete a checkout after applying a percentage discount to a Subscriptions ', () => {
		cy.newCheckout('URL_Staging');
		cy
			.contains('button', 'Change customer')
			.scrollIntoView()
			.click();
		cy
			.contains('div', 'Search customer..')
			.should('be.visible');
		cy
			.contains('div', 'Search customer..')
			.next()
			.find('input')
			.type('Dugar Erika{enter}', { delay: 999 });
		cy.wait(80);
		cy.addItemSubscription('Subscription B');
		cy.addPercentageDiscount('Subscription B', '40', '15');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify it is possible to complete a checkout after applying a fix discount to a Subscriptions ', () => {
		cy.newCheckout('URL_Staging');
		cy
			.contains('button', 'Change customer')
			.scrollIntoView()
			.click();
		cy
			.contains('div', 'Search customer..')
			.should('be.visible');
		cy
			.contains('div', 'Search customer..')
			.next()
			.find('input')
			.type('Dugar Erika{enter}', { delay: 999 });
		cy.wait(80);
		cy.addItemSubscription('Subscription B');
		cy.addFixedDiscount('Subscription B', '5', '15');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	// Checkout successfully - Offers
	it('Verify it is possible to complete a checkout successfully for 1 offer', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemOffer('Down Payment Offer');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
	it('Verify it is possible to complete a checkout after applying a percentage discount to a offer ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemOffer('Down Payment Offer');
		cy.addPercentageDiscount(
			'Down Payment Offer',
			'40',
			'15'
		);
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify it is possible to complete a checkout after applying a fix discount to a offer ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemOffer('Down Payment Offer');
		cy.addFixedDiscount('Down Payment Offer', '5', '15');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	// Checkout successfully - Services
	it('Verify it is possible to complete a checkout successfully for 1 service', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Short Hair');
		cy.fillButton('Cash');
		cy.addEmployee('Zstaff');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
	it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Hair Cut');
		cy.addPercentageDiscount('Hair Cut', '40', '15');
		cy.fillButton('Cash');
		cy.addEmployee('Zstaff');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Long Hair');
		cy.addFixedDiscount('Long Hair', '5', '15');
		cy.fillButton('Cash');
		cy.addEmployee('Zstaff');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	// checkout successfully - Giftcards
	it('Verify it is possible to complete a checkout for Gift card', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemGiftCard('243.48 SAR Gift Card');
		cy.fillButton('Cash');
		cy.wait(99);
		cy.expectedMessageCompleteSale('Sale Completed');
	});
});

describe('Staging - Beta Vendor Admin | Calendar| Appointment Checkout | logged with Receptionist Credentials', () => {
	before(() => {
		// ensure clean test slate for these tests
		cy.then(Cypress.session.clearAllSavedSessions);
	});

	beforeEach(() => {
		cy.login(
			'Receptionist Session',
			Cypress.env('Vendor1_Receptionist_Username_Staging'),
			Cypress.env('Vendor1_Receptionist_Password_Staging')
		);
		// cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		// cy.wait(8000);
		// cy.get('body').then(($body) => {
		// 	if ($body.text().includes('Welcome Back!')) {
		// 		cy
		// 			.contains('h3', 'Welcome Back!')
		// 			.next('button')
		// 			.scrollIntoView()
		// 			.click();
		// 		cy.wait(8000);
		// 	}
		// 	if ($body.text().includes('Enable Notifications')) {
		// 		cy.contains('button', 'Not now').click();
		// 		cy.wait(800);
		// 	}
		// });
		// cy.wait(80);
	});

	afterEach(() => {
		cy.clearCookies();
	});

	// Checkout successfully - Services
	it('Verify it is possible to complete a checkout successfully for 1 service', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Short Hair');
		cy.fillButton('Cash');
		cy.addEmployee('Zstaff');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
	it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Hair Cut');
		cy.addEmployee('Zstaff');
		cy.addPercentageDiscount('Hair Cut', '40', '15');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Long Hair');
		cy.addFixedDiscount('Long Hair', '5', '15');
		cy.addEmployee('Zstaff');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	// checkout successfully - Giftcards
	it('Verify it is possible to complete a checkout for Gift card', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemGiftCard('243.48 SAR Gift Card');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
});

describe('Staging - Beta Vendor Admin | Calendar| Appointment Checkout | logged with Staff Credentials', () => {
	before(() => {
		// ensure clean test slate for these tests
		cy.then(Cypress.session.clearAllSavedSessions);
	});

	beforeEach(() => {
		cy.login(
			'Staff Session',
			Cypress.env('Vendor1_Staff_Username_Staging'),
			Cypress.env('Vendor1_Staff_Password_Staging')
		);
		// cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		// cy.wait(8000);
		// cy.get('body').then(($body) => {
		// 	if ($body.text().includes('Welcome Back!')) {
		// 		cy
		// 			.contains('h3', 'Welcome Back!')
		// 			.next('button')
		// 			.scrollIntoView()
		// 			.click();
		// 		cy.wait(8000);
		// 	}
		// 	if ($body.text().includes('Enable Notifications')) {
		// 		cy.contains('button', 'Not now').click();
		// 		cy.wait(800);
		// 	}
		// });
		// cy.wait(80);
	});

	afterEach(() => {
		cy.clearCookies();
	});

	// Checkout successfully - Services
	it('Verify it is possible to complete a checkout successfully for 1 service', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Short Hair');
		cy.fillButton('Cash');
		cy.addEmployee('Zumba');
		cy.expectedMessageCompleteSale('Sale Completed');
	});
	it('Verify it is possible to complete a checkout after applying a percentage discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Hair Cut');
		cy.addPercentageDiscount('Hair Cut', '40', '15');
		cy.fillButton('Cash');
		cy.addEmployee('Zumba');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify it is possible to complete a checkout after applying a fix discount to a service ', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemService('Long Hair');
		cy.addFixedDiscount('Long Hair', '5', '15');
		cy.fillButton('Cash');
		cy.addEmployee('Zumba');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	// checkout successfully - Giftcards
	it('Verify it is possible to complete a checkout for Gift card', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemGiftCard('243.48 SAR Gift Card');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
	});

	it('Verify after completing a checkout successfully it is possible to send the invoice thru email', () => {
		cy.newCheckout('URL_Staging');
		cy.addItemGiftCard('243.48 SAR Gift Card');
		cy.fillButton('Cash');
		cy.expectedMessageCompleteSale('Sale Completed');
		cy.contains('button', 'Send').should('be.visible');
		cy.contains('button', 'Send').click({ force: true });
		cy.contains('h3', 'Send Email').should('be.visible');
	});
});

// test cases pendingDuring the Appointment Checkout:

// Verify packages (Subscriptions) cannot be mixed with other items like products, services and offers ✅

// Verify it is possible to add new service after removing one leaving the cart empty. ✅

// Verify it is possible to add new product with a service already in the cart ✅

// Verify it is possible to add new subscription with a service and product already in the cart  ✅

// Verify that it is possible to remove a service after removing the applied coupon. ✅

// Verify that it is possible to assign a staff member to a service after removing the applied coupon.  ✅

// Verify that it is possible to assign a quantity to a service after removing the applied coupon.  ✅
