# Bookr Vendor Admin – Test Automation  

This repository contains automated test cases for the **Vendor Admin Portal of [Bookr.co](https://bookr.co)**.  
The tests are written using **[Cypress](https://www.cypress.io/)** with **JavaScript**, ensuring consistent and reliable validation of key functionalities.  

---

## 🚀 Tech Stack  
- **Framework:** Cypress  
- **Language:** JavaScript (ES6)  
- **Test Runner:** Cypress Test Runner  
- **Target Application:** Bookr Vendor Admin  

---

## 📂 Project Structure  
The test cases are organized by feature area for clarity and maintainability.  


Each folder contains Cypress test files (`*.cy.js`) covering the main workflows of the Vendor Admin.  
---

## ✅ Features Covered  
- **Calendar & Appointments**: Booking, new appointments, invoicing, blocking times, etc.  
- **Coupons**: Creation and validation of coupons.  
- **Customers**: Adding customers and using filters.  
- **Employees**: Attendance, contracts, payroll, working hours.  
- **Gift Cards**: Gift card creation and usage.  
- **Inventory**: Product and supplier management.  
- **Offers**: Promotional offers.  
- **Subscriptions**: Subscription workflows.  

---

## ▶️ Running the Tests  

### 1. Install dependencies  
```bash
npm install
# Run tests in Chrome
npm run chrome  

# Run all tests headless
npm run headless  

# Run with Allure reporting
npm run ui-regression-allure  

# Generate Mochawesome report
npm run mochawesome-merge

📌 Notes

These test cases are designed for the staging and production environment of Bookr Vendor Admin.

The cases validate workflows but may not include invoice-level validations unless specified.

