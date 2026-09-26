const {test, expect} = require ('@playwright/test') ;

// test('First Program code', async function()
// {
// //step 1: navigate to the url
// //step 2: enter the username and password
// //step 3: click on login button

// });

test('context browser program code', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com/");


});

test('page program code', async({page})=>{

    await page.goto("https://auto-robin-qtr.santechture.com/ROBIN/faces/home.xhtml");
    //Define Locators
    const userfield = page.locator('#username');
    const passfield = page.locator('#password');
    const loginfield = page.locator('#kc-login');
    //get title - Assertion
    console.log (await page.title());
    await expect(page).toHaveTitle("Sign in to QATAR");
    // locators 
    // CSS and xpath but with playwright we have to rely on CSS selector
    // to enter any data use type or fill but in the last version
    // of playwright they deprecated type so use only fill

    /////////////////Invalid Login case///////////////////
    //await page.locator('#username').type("QFacilityAdmin");
    await page.locator('#username').fill("QFacilityAdmin");
    await page.locator('#password').fill("QFacilityAdmin");
    await page.locator('#kc-login').click();
    //wait untill this locator shown up page 
    console.log (await page.locator('#input-error').textContent());
    await expect(page.locator('#input-error')).toContainText('Invalid username or password.');

    /////////////////Valid Login case///////////////////
    // keep the vaild user, delete the old pass then enter the valid one
    await passfield.fill('QFacilityAdmin123');
    await loginfield.click();
    console.log(await page.locator('[class="card  overview-box-1 orange"] a').first().textContent());
    console.log(await page.locator('[class="card  overview-box-1 orange"] a').nth(1).textContent());
    console.log(await page.locator('[class="card  overview-box-1 orange"] a').allTextContents());
})

test('Home page selector', async({page})=>{
    await page.goto("https://auto-robin-qtr.santechture.com/ROBIN/faces/home.xhtml");
    //Define Locators
    const userfield = page.locator('#username');
    const passfield = page.locator('#password');
    const loginfield = page.locator('#kc-login');

    //Actions
    await userfield.fill("QFacilityAdmin");
    await passfield.fill("QFacilityAdmin123");
    await loginfield.click();

    await page.locator('[id="facilityForm:j_idt87_menuButton"]').click();
    await page.locator('[id="facilityForm:j_idt90"]').click();

    await page.pause();

    //Assertion


})