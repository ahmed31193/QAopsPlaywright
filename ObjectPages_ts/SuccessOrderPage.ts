// const {test , expect} = require('@playwright/test');
import {test , expect , Locator , Page} from '@playwright/test'

export class SuccessOrderPage 
{
    // page : Page;
    successText : Locator;
    orderID : Locator;
    myOrderButton : Locator;
    orderTable : Locator;
    tablecontent : Locator;
    summaryid : Locator;

constructor(page : Page)
{
    this.successText = page.locator('.hero-primary');
    this.orderID = page.locator('.em-spacer-1 .ng-star-inserted');
    this.myOrderButton = page.locator('button[routerlink*="myorders"]');
    this.orderTable = page.locator('tbody');
    this.tablecontent = page.locator('tbody tr');
    this.summaryid = page.locator('.col-text');
}


async getSuccessDetails()
{
    await expect(this.successText).toHaveText(' Thankyou for the order. ');
    const orderID = await this.orderID.textContent();
    console.log(orderID);
    return orderID;
}

async getMyordersPage (orderID : any)
{
    await this.myOrderButton.click();
    await this.orderTable.waitFor();

    for (let i=0; i< await this.tablecontent.count() ; i++)
    {
        const actualorderID  = await this.tablecontent.nth(i).locator('th').textContent();
        if (orderID.includes(actualorderID))
        {
            await this.tablecontent.nth(i).locator('button').first().click();
            break;
        }
    }

    const summaryID = await this.summaryid.first().textContent();
    expect(orderID.includes(summaryID)).toBeTruthy();
}
  
}

module.exports = {SuccessOrderPage};