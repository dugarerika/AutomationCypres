
# Feature: Vendor Login

#   Background:
#     Given user is on the vendor login page
#       | URL |
#       | https://vendor.bookr-dev.com/ |

#   Scenario: User should not be able to login with invalid credentials
#     When the user enters credentials
#       | Email | Password |
#       | qatartest | qatartest |
#     And hits SIGN IN
#     Then An error message is displayed
#     And Close browser

#   Scenario: Email credential is required
#     When the user enters credentials
#       | Email | Password |
#       |       | secretx  |
#     And hits SIGN IN
#     Then error message username address is required is displayed
#     And Close browser

#   Scenario: Password credential is required
#     When the user enters credentials
#       | Email | Password |
#       | testx |          |
#     And hits SIGN IN
#     Then error message Password is required displayed
#     And Close browser

#   Scenario: Email and password credentials are required
#     When the user left credentials empty
#     And hits SIGN IN
#     Then error messages are displayed
#     And Close browser

#   Scenario Outline: User should be able to login with different Roles valid credentials
#     When the user login into the vendor with <Email> and <Password> from <Role> credentials
#     And hits SIGN IN
#     Then the user should be logged successfully
#     And Close browser
#     Examples:
#       |Role         | Email     | Password    |
#       |Admin        | testsalon | testsalon1o |
#       |Staff        | Nube      | 1234567890  |
#       |Read-Only    | readonly6 | 1234567890  |
#       |Receptionist | Atardecer | 1234567890  |
