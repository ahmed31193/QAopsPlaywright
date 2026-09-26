const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../ObjectPages/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


Given('Login to Ecommerce application with {string} and {string}', { timeout: 10 * 1000 }, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  //test case steps
  const loginpage = this.poMnager.getLoginPage();
  await loginpage.goto();
  await loginpage.validLogin(username, password);

});

When('Add {string} to cart', { timeout: 10 * 1000 }, async function (productname) {
  // Write code here that turns the phrase above into concrete actions
  const dashboardPage = this.poMnager.getDashboardPage();
  await dashboardPage.searchproduct_then_addtocart(productname);
  await dashboardPage.navigatetocart();
});

Then('Verify {string} is displayed in the cart', { timeout: 10 * 1000 }, async function (productname) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poMnager.getCartPage();
  await cartPage.checkCartVisibility(productname);
  await cartPage.checkout();
});

When('Enter valid details and place the order with {string} and {string} and {string}', { timeout: 10 * 1000 }, async function (username, nameonCard, couponname) {
  // Write code here that turns the phrase above into concrete actions
  const orderReviewPage = this.poMnager.getorderReviewPage();
  await orderReviewPage.getShipInfo(username);
  await orderReviewPage.getpersonalInfo(nameonCard, couponname);
  await orderReviewPage.getPlaceorder();
});

Then('Verify order is present in the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
  const successOrderPage = this.poMnager.getsuccessOrderPage();
  const orderID = await successOrderPage.getSuccessDetails();
  await successOrderPage.getMyordersPage(orderID);
});

Given('Login in with the invalid credientials {string} and {string}', {timeout : 20*1000 } , async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto("https://auto-robin-qtr.santechture.com/ROBIN/faces/home.xhtml");
  await this.page.locator('#username').fill(username);
  await this.page.locator('#password').fill(password);
  await this.page.locator('#kc-login').click();
});

Then('the error message should be displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  //wait untill this locator shown up page 
  console.log(await this.page.locator('#input-error').textContent());
  await expect(this.page.locator('#input-error')).toContainText('Invalid username or password.');

});



