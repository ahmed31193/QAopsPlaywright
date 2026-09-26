Feature: Ecommerece validations
  @Regression
  Scenario: Placing the Order
    Given Login to Ecommerce application with "ahmedamer018@gmail.com" and "Ahmed_123"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order with "ahmedamer018@gmail.com" and "AhmedAmer" and "rahulshettyacademy"
    Then Verify order is present in the OrderHistory


  @Validations
  Scenario Outline: Check the error while loging
    Given  Login in with the invalid credientials "<username>" and "<password>"
    Then  the error message should be displayed

    Examples:
      | username       | password          |
      | QFacilityAdmin | QFacilityAdmin    |
      | Ahmed amer hom | QFacilityAdmin123 |