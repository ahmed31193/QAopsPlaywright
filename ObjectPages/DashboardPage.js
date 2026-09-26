class DashboardPage {


constructor(page)
{
    this.productstext = page.locator(".card-body b");
    this.products = page.locator(".card-body");
    this.cart = page.locator('[routerlink="/dashboard/cart"]');
}

async searchproduct_then_addtocart (productname)
{
    await this.productstext.first().waitFor();
    const titles = await this.productstext.allTextContents();
    console.log(titles);

    const count = await this.products.count();
    console.log(count);
    for (let i=0; i < count; ++i)
    {
        if ( await this.products.nth(i).locator("b").textContent() === productname)
        {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
}

async navigatetocart ()
{
    await this.cart.click();
}


}

module.exports = {DashboardPage};