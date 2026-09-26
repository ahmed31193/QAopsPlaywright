// const {LoginPage} = require('./LoginPage');
// const {DashboardPage} = require('./DashboardPage');
// const {CartPage} = require('./CartPage');
// const {OrderReviewPage} = require('./OrderReviewPage'); 
// const {SuccessOrderPage} = require('./SuccessOrderPage');
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {OrderReviewPage} from './OrderReviewPage';
import {SuccessOrderPage} from './SuccessOrderPage'
import { Page } from '@playwright/test';

export class POManager
{
    page : Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    orderreviewPage : OrderReviewPage;
    successOrderPage : SuccessOrderPage;

    constructor(page:Page)
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