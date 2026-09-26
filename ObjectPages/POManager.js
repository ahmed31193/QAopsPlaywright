const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrderReviewPage} = require('./OrderReviewPage'); 
const {SuccessOrderPage} = require('./SuccessOrderPage');

class POManager
{

    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderreviewPage = new OrderReviewPage(this.page);
        this.successOrderPage = new SuccessOrderPage(this.page);
    }

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getCartPage()
{
    return this.cartPage;
}

getorderReviewPage ()
{
    return this.orderreviewPage;
}

getsuccessOrderPage ()
{
    return this.successOrderPage;
}


}

module.exports = {POManager};