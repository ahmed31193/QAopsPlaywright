const { test, expect } = require('@playwright/test');

test('playwright special locators' , async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption('Female');
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();    
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5 sec deafult timeout for expect assertions --{timeout : 10000}-- step level -- testlevel
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 8000});
    await page.getByRole("link", {name : 'Shop'}).click();

    await page.locator('app-card').filter({hasText : 'Nokia Edge'}).getByRole("button").click();

})

//30 seconds - test timeout error
test('playwright test level timeout' , async({page})=>{

    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout : 9000});
    page.setTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption('Female');
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();    
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5 sec deafult timeout for expect assertions --{timeout : 10000}-- step level -- testlevel
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 8000});
   
   // Global -> test -> step
    await page.getByRole("link", {name : 'Shop'}).click({timeout : 15000});
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    //let's say u have 2 more assertions
    await page.locator('app-card').filter({hasText : 'Nokia Edge'}).getByRole("button").click();

})