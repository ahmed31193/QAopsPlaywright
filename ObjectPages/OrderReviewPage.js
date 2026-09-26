const {test , expect} = require('@playwright/test');
class OrderReviewPage
{

constructor(page)
{
    this.page = page;
    this.selectcountry = this.page.locator('[placeholder="Select Country"]');
    this.dropdownlist = this.page.locator(".ta-results");
    this.email = this.page.locator('.user__name [type="text"]');
    this.expirydate = this.page.locator('select.input.ddl');
    this.cvvcode = this.page.locator('.field.small .input.txt');
    this.nameoncard = this.page.locator('.field .input.txt');
    this.coupon = this.page.locator('.field.small .input.txt');    
    this.submitbutton = this.page.locator('[type="submit"]');
    this.coupontext = this.page.locator('text= * Coupon Applied');
    this.placeprder = this.page.locator('.action__submit ');
}


async getShipInfo (username)
{
    //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    await this.selectcountry.pressSequentially("eg");
    await this.dropdownlist.waitFor();
    const dropdowncount = await this.dropdownlist.locator('[type="button"]').count();
    console.log(dropdowncount);

    for (let i=0 ; i< dropdowncount ; i++)
    {
        const text = await this.dropdownlist.locator('[type="button"]').nth(i).textContent();
        if (text == " Egypt")
        {
            await this.dropdownlist.locator('[type="button"]').nth(i).click();
            break;
        }
    }
    
    await expect(this.email.first()).toHaveText(username);
}

async getpersonalInfo (nameonCard, couponname)
{
    await this.expirydate.first().selectOption('08');
    await this.expirydate.last().selectOption('28');
    //await page.locator('[fdprocessedid="21xru3"]').fill("123");
    await this.cvvcode.first().fill('123');
    //await page.locator('[fdprocessedid="2g2ioj"]').fill("AhmedAmer");
    await this.nameoncard.nth(2).fill(nameonCard);
    //await page.locator('[fdprocessedid="00k7o"]').fill("rahulshettyacademy");
    await this.coupon.last().fill(couponname);
    await this.submitbutton.click();

    await expect (this.coupontext).toBeVisible();
}
  
async getPlaceorder ()
{
    await this.placeprder.click();
}

}

module.exports = {OrderReviewPage};