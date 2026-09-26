# Feature: Error validations
    
#     @Validations
#     Scenario: Check the error while loging
#         Given  Login in with the invalid credientials "QFacilityAdmin" and "QFacilityAdmin"
#         Then  the error message should be displayed

Feature: Error validations
    
    @Validations
    Scenario Outline: Check the error while loging
        Given  Login in with the invalid credientials "<username>" and "<password>"
        Then  the error message should be displayed

    Examples:
        | username        | password        | 
        | QFacilityAdmin  | QFacilityAdmin  |
        | Ahmed amer hom  | QFacilityAdmin123  | 