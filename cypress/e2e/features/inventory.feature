
# Feature: Vendor Inventory
#  Background:
#    Given user is on the vendor login page
#      | URL |
#      | https://vendor.bookr-dev.com/ |
#    And the user login into the vendor with Admin credentials
#      | Email | Password |
#      | testsalon | testsalon1o |

#   Scenario: User should be able to access to the inventory section
#     When the user clicks on the inventory icon
#     Then the user has access to the inventory section
#     And Close

#   Scenario: Verify ADD PRODUCT button works properly
#     When the user clicks on the inventory icon
#     And the user clicks on the ADD PRODUCT button
#     Then the Add Product form is displayed
#     And clicks on close form
#     And Close

#   Scenario: Verify ADD BRAND button works properly
#     When the user clicks on the inventory icon
#     And the user clicks on the ADD BRAND button
#     Then the Add Brand form is displayed
#     And Close

#   Scenario: Verify 'ADD BRAND' '+' to create a new brand works properly
#     When the user clicks on the + icon
#     And type a New Brand
#       | Brand |
#       | Deva Curls |
#     And Click on CREATE button
#     Then the new brand is added successfully
#     And Close

#   Scenario: Verify delete icon works properly
#     When the user clicks on the inventory icon
#     And the user clicks on the delete icon button
#     Then the delete product modal is displayed
#     And Close

#   Scenario: Verify product is delete after confirm the delete
#     When the user clicks on the inventory icon
#     And the user clicks on the delete icon button
#     Then the delete product modal is displayed
#     And Close

#   Scenario: Verify product is NOT deleted after canceling the delete
#     When the user clicks on the inventory icon
#     And the user clicks on the delete icon button
#     Then the delete product modal is displayed
#     And click on CANCEL
#     Then The product is delete successfully
#     And Close

#   Scenario: Verify product is deleted after confirming the delete
#     When the user clicks on the inventory icon
#     And the user clicks on the delete icon button
#     Then the delete product modal is displayed
#     And click on DELETE
#     Then The product is delete successfully
#     And Close

#   Scenario Outline: Verify required fields on Add Brand form and the expected message (Negative tests)
#     When the user clicks on the inventory icon
#     And the user clicks on the ADD PRODUCT button
#     And the user enters <ProductName> and <ProductBrand> and <ProductCategory> and <ProductQuantity> and <ProductSKU> and <Price> info
#     And click on the Submit button
#     Then The <ExpectedMessage> is displayed
#     And clicks on close form
#     And Close
#     Examples:
#     | ProductName | ProductSKU | ProductQuantity | Price | ProductBrand | ProductCategory | ExpectedMessage                           |
#     |             | ABC        | 2               | 12.4  | Inecto       | Uncategorized   | Please enter product name                 |
#     | AV          | ABC        | 2               | 12.4  | Inecto       | Uncategorized   | Product name must be at least 3 characters|
#     | kerastase   |            | 2               | 12.4  | Inecto       | Uncategorized   | Please enter product sku                  |
#     | kerastase   | ABC        |                 | 12.4  | Inecto       | Uncategorized   | Quantity must be a number                 |
#     | kerastase   | ABC        | A               |       | Inecto       | Uncategorized   | Quantity must be a number                 |
#     | kerastase   | ABC        | 2               |       | Inecto       | Uncategorized   | Price must be a number                    |
#     | kerastase   | ABC        | 2               | .     | Inecto       | Uncategorized   | Price must be a number                    |
#     | kerastase   | ABC        | 2               | 12.4  |              | Uncategorized   | Please select product brand               |
#     | kerastase   | ABC        | 2               | 12.4  | Inecto       |                 | Please select product category            |
# #
#   Scenario Outline: Verify required fields on Add Brand form and the expected message (Positive tests)
#     When the user clicks on the inventory icon
#     And the user clicks on the ADD PRODUCT button
#     And the user enters <ProductName> and <ProductBrand> and <ProductCategory> and <ProductQuantity> and <ProductSKU> and <Price> info
#     And click on the Submit button
#     Then The <ExpectedMessage> is displayed
#     And Close
#     Examples:
#       | ProductName | ProductSKU | ProductQuantity | Price | ProductBrand | ProductCategory | ExpectedMessage      |
#       | kerastase   | KERA       | 6               | 10.4  | &&&&&&       | Uncategorized   | Created successfully |
#       | Bioderma aqu| VITX       | 1               | 99.5  | &&&&&&       | Uncategorized   | Created successfully |
#       | Vitamina C  | BIO        | 100             | 3.5   | 999999       | Uncategorized   | Created successfully |

#   Scenario Outline: Verify non required field Cost Price on Add Brand form and the expected message
#     When the user clicks on the inventory icon
#     And the user clicks on the ADD PRODUCT button
#     And the user enters <ProductName> and <ProductBrand> and <ProductCategory> and <ProductQuantity> and <ProductSKU> and <Price> info
#     And <CostPrice> info
#     And click on the Submit button
#     Then The <ExpectedMessage> is displayed
#     And Close
#     Examples:
#       | ProductName | ProductSKU | ProductQuantity | Price | ProductBrand | ProductCategory | CostPrice | ExpectedMessage      |
#       | kerastase   | KERA       | 6               | 10.4  | &&&&&&       | Uncategorized   | e         | Created successfully |
#       | Bioderma aqu| VITX       | 1               | 99.5  | &&&&&&       | Uncategorized   | 4.5       | Created successfully |
#       | Vitamina C  | BIO        | 100             | 3.5   | 999999       | Uncategorized   | 10        | Created successfully |
