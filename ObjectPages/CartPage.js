const {test , expect} = require('@playwright/test');
class CartPage 
{

constructor(page)
{
    this.page = page;
    this.mycart = this.page.locator("div li");
    this.mycartinfo = this.page.locator("h3:has-text('ZARA COAT 3')");
    this.checkoutbutton = this.page.locator("text= Checkout");
}

async checkCartVisibility (productName)
{
    await this.mycart.first().waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
}

async checkout ()
{
    await this.checkoutbutton.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}

module.exports ={CartPage};