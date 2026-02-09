/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

describe('Staging - Beta Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Admin Credentials', () => {
	// before(() => {
	//     // ensure clean test slate for these tests
	//     cy.then(Cypress.session.clearAllSavedSessions)
	// })

	beforeEach(() => {
		cy.login(
			'Admin Session',
			Cypress.env('Vendor_Admin_Username_Staging'),
			Cypress.env('Vendor_Admin_Password_Staging')
		);
		cy.wait(10000);
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy.wait(8000);
		cy.get('body').then(($body) => {
			if ($body.text().includes('Welcome Back!')) {
				cy
					.contains('h3', 'Welcome Back!')
					.next('button')
					.scrollIntoView()
					.click();
				cy.wait(8000);
			}
			if ($body.text().includes('Enable Notifications')) {
				cy.contains('button', 'Not now').click();
				cy.wait(800);
			}
		});
		cy.wait(100);
	});

	afterEach(() => {
		cy.clearCookies();
	});

	it('Verify Staff is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Employee cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Start time cannot be empty')
			.should('be.visible');
	});

	it('Verify End time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'End time cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains(
				'div>span',
				'Blocked times start and end time are invalid'
			)
			.should('be.visible');
	});

	it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields', () => {
		cy.newBlockTime('URL_Staging');
		// cy.contains('div','Choose a staff').next('div').find('input').should('be.visible')
		// cy.contains('div','Choose a staff').next('div').find('input').click().type('Helen {enter}')
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.type('Mateo {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('01:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Blocked Time Created')
			.should('be.visible');
	});

	it('Verify it is possible to edit staff on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.type('Mateo {enter}');
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit Start time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit End time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to delete a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for', {
				matchCase: false
			})
			.next('span', 'Helen')
			.click({ force: true });
		cy.contains('button', 'Delete').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime deleted successfully'
			)
			.should('be.visible');
	});
});

describe('Staging - Beta Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Staff Credentials', () => {
	before(() => {
		// ensure clean test slate for these tests
		cy.then(Cypress.session.clearAllSavedSessions);
	});

	beforeEach(() => {
		cy.login(
			'Staff Session',
			Cypress.env('Vendor_Staff_Username_Staging'),
			Cypress.env('Vendor_Staff_Password_Staging')
		);
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy.wait(8000);
		cy.get('body').then(($body) => {
			if ($body.text().includes('Welcome Back!')) {
				cy
					.contains('h3', 'Welcome Back!')
					.next('button')
					.scrollIntoView()
					.click();
				cy.wait(8000);
			}
			if ($body.text().includes('Enable Notifications')) {
				cy.contains('button', 'Not now').click();
				cy.wait(800);
			}
		});
	});

	afterEach(() => {
		cy.clearCookies();
	});

	it('Verify Staff is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Employee cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Zumba {enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Start time cannot be empty')
			.should('be.visible');
	});

	it('Verify End time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Zumba {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'End time cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Zumba {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains(
				'div>span',
				'Blocked times start and end time are invalid'
			)
			.should('be.visible');
	});

	it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Zumba {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('01:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Blocked Time Created')
			.should('be.visible');
	});

	it('Verify it is possible to edit staff on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.type('Zumba {enter}');
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit Start time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Mateo Mateo')
			.click({ force: true });
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit End time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Mateo Mateo')
			.click({ force: true });
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to delete a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Zumba')
			.click({ force: true });
		cy.contains('button', 'Delete').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime deleted successfully'
			)
			.should('be.visible');
	});
});

describe('Staging - Beta Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Receptionist Credentials', () => {
	before(() => {
		// ensure clean test slate for these tests
		cy.then(Cypress.session.clearAllSavedSessions);
	});

	beforeEach(() => {
		cy.login(
			'Receptionist Session',
			Cypress.env('Vendor_Receptionist_Username_Staging'),
			Cypress.env('Vendor_Staff_Password_Staging')
		);
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy.wait(8000);
		cy.get('body').then(($body) => {
			if ($body.text().includes('Welcome Back!')) {
				cy
					.contains('h3', 'Welcome Back!')
					.next('button')
					.scrollIntoView()
					.click();
				cy.wait(8000);
			}
			if ($body.text().includes('Enable Notifications')) {
				cy.contains('button', 'Not now').click();
				cy.wait(800);
			}
		});
	});

	afterEach(() => {
		cy.clearCookies();
	});

	it('Verify Staff is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Employee cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Start time cannot be empty')
			.should('be.visible');
	});

	it('Verify End time is required to create a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('{enter}{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'End time cannot be empty')
			.should('be.visible');
	});

	it('Verify Start time and End time cannot be the same time when creating a blocktime on the Calendar', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains(
				'div>span',
				'Blocked times start and end time are invalid'
			)
			.should('be.visible');
	});

	it('Verify it is possible to create a blocktime on the Calendar by filling up the required fields', () => {
		cy.newBlockTime('URL_Staging');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('div', 'Choose a staff')
			.next('div')
			.find('input')
			.click()
			.type('Helen {enter}');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type('01:00{enter}');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type('03:00{enter}');
		cy.contains('button', 'Submit').click({ force: true });
		cy
			.contains('div>span', 'Blocked Time Created')
			.should('be.visible');
	});

	it('Verify it is possible to edit staff on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Staff')
			.parent()
			.next('div')
			.find('input')
			.type('Helen {enter}');
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit Start time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'Start Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to edit End time on a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.should('be.visible');
		cy
			.contains('span', 'End Time')
			.parent()
			.next('div')
			.find('input')
			.type(
				'{downarrow}{downarrow}{downarrow}{downarrow}{enter}'
			);
		cy.wait(1000);
		cy.contains('button', 'Update').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime updated successfully'
			)
			.should('be.visible');
	});

	it('Verify it is possible to delete a blocktime from the Calendar', () => {
		cy.visit(Cypress.env('URL_Staging') + 'admin/calendar');
		cy
			.contains('span', 'Blocked Time for')
			.next('span', 'Helen')
			.click({ force: true });
		cy.contains('button', 'Delete').click({ force: true });
		cy
			.contains(
				'div>span',
				'Employee Blocktime deleted successfully'
			)
			.should('be.visible');
	});
});

describe.skip(
	'Staging - Beta Vendor Admin | Calendar| Create Blocktime on the Calendar | logged with Read-Only Credentials',
	() => {
		before(() => {
			// ensure clean test slate for these tests
			cy.then(Cypress.session.clearAllSavedSessions);
		});

		beforeEach(() => {
			cy.login(
				'Read-only Session',
				Cypress.env('Vendor_ReadOnly_Username_Staging'),
				Cypress.env('Vendor_ReadOnly_Password_Staging')
			);
		});

		afterEach(() => {
			cy.clearCookies();
		});

		it('Verify The option to add Block Time is not available for Readonlyu Role', () => {
			cy.visit(
				Cypress.env('URL_Staging') + 'admin/calendar'
			);
			cy.newBlockTime('URL_Staging');
			cy
				.contains('div', 'Choose a staff')
				.next('div')
				.find('input')
				.should('be.visible')
				.click()
				.type('Helen {enter}');
			cy
				.contains('span', 'Start Time')
				.parent()
				.next('div')
				.find('input')
				.should('be.visible')
				.type('01:00{enter}');
			cy
				.contains('span', 'End Time')
				.parent()
				.next('div')
				.find('input')
				.should('be.visible')
				.type('03:00{enter}');
			cy
				.contains('button', 'Submit')
				.click({ force: true });
			cy
				.contains(
					'div>span',
					'User does not have enough permissions to use this service'
				)
				.should('be.visible');
		});
	}
);
