/// <reference types="cypress" />
/// <reference types="cypress-xpath" />



context('Actions', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr') // Set viewport to 375px x 812px
      cy.visit('https://customer.bookr-dev.com/vendors/testsalon')
    })
  
    // https://customer.bookr-dev.com/vendors/testsalon
  
    it('.type() - type into a DOM element', () => {
      // https://on.cypress.io/type
      cy.get('.action-email').type('fake@email.com')
      cy.get('.action-email').should('have.value', 'fake@email.com')
  
      // .type() with special character sequences
      cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      cy.get('.action-email').type('{del}{selectall}{backspace}')
  
      // .type() with key modifiers
      cy.get('.action-email').type('{alt}{option}') //these are equivalent
      cy.get('.action-email').type('{ctrl}{control}') //these are equivalent
      cy.get('.action-email').type('{meta}{command}{cmd}') //these are equivalent
      cy.get('.action-email').type('{shift}')
  
      // Delay each keypress by 0.1 sec
      cy.get('.action-email').type('slow.typing@email.com', { delay: 70 })
      cy.get('.action-email').should('have.value', 'slow.typing@email.com')
  
      cy.get('.action-disabled')
        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking', { force: true })
      cy.get('.action-disabled').should('have.value', 'disabled error checking')
    })
  
  })
  