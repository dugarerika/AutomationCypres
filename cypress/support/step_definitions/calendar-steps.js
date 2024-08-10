import{Before, Given, When, And, Then} from "cypress-cucumber-preprocessor/steps"

Given('user is on the vendor login page',() => {
    cy.visit("https://vendor.bookr.co");
})



When('enter a username', () => {
    // cy.get(#)
});

// Then('', () => {
// });


// And('', () => {
// });

// Given('', () => {
// });