// const {test , expect} = require('@playwright/test');
import {test , expect , Locator , Page} from '@playwright/test'
export class CartPage 
{
    page : Page;
    mycart : Locator;
    mycartinfo : Locator;
    checkoutbutton : Locator;

constructor(page : Page)
{
    this.page = page;
    this.mycart = this.page.locator("div li");
    this.mycartinfo = this.page.locator("h3:has-text('ZARA COAT 3')");
    this.checkoutbutton = this.page.locator("text= Checkout");
}

async checkCartVisibility (productName : string)
{
    await this.mycart.first().waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
}

async checkout ()
{
    await this.checkoutbutton.click();
}

 getProductLocator(productName : string)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}

module.exports ={CartPage};