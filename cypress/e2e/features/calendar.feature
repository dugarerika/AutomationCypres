Feature: Calendar - Create Booking

  Scenario: User should be able to access to the calendar section
    Given user is on the vendor login page
    When enter username testsalon
#       | URL |
#       | https://vendor.bookr.co/ |
#     And the user login into the vendor with Admin credentials
#       | Email | Password |
#       | testsalon | testsalon1o |
#     When the user clicks on the calendar icon
#     Then the user has access to the calendar section

#  Scenario: User should be able display new appointment modal by clicking on the calendar
#    Given user is on the calendar page
#    When the user clicks on the calendar time slot
#      |Staff|   Time  |
#      |  3  | 7:00 AM |
#    Then the New Appointment modal is display

#   Scenario: User should be able to add new appointment for walking customer
#     Given user is on the calendar page
#     When the user clicks on the calendar time slot
#       |Staff|   Time  |
#       |  3  | 7:00 AM |
#     And the user select walk in customer
#     And the user selects service
#     And click on create button
#     Then The appointment is created successfully
#       |Staff|   Time  |
#       |  3  | 7:00 AM |

#  Scenario: User should be able to add new appointment for walking customer by leaving customer field empty
#    Given user is on the calendar page
#    When the user clicks on the calendar time slot
#      |Staff|   Time  |
#      |  4  | 7:00 AM |
#    And the user select category
#    And the user selects service
#    And click on create button
#    Then The appointment is created successfully
#      |Staff|   Time  |
#      |  4  | 7:00 AM |

#  Scenario: User should be able to add new appointment by searching customer phone number from vendor
#    Given user is on the calendar page
#    When the user clicks on the calendar time slot
#      |Staff|   Time  |
#      |  5  | 7:00 AM |
#    And the user search a customer from the vendor
#      |FirstName| PhoneNumber|
#      | Husam R |+97336377312|
#    And the user selects service
#    And click on create button
#    Then The appointment is created successfully
#      |Staff|   Time  |
#      |  5  | 7:00 AM |

#  Scenario: User should be able to add new appointment by searching customer name from vendor
#    Given user is on the calendar page
#    When the user clicks on the calendar time slot
#      |Staff|   Time  |
#      |  6  | 7:00 AM |
#    And the user search a customer by name from the vendor
#      |FirstName| PhoneNumber|
#      | Husam |+97336377312|
#    And the user selects service
#    And click on create button
#    Then The appointment is created successfully
#      |Staff|   Time  |
#      |  6  | 7:00 AM |