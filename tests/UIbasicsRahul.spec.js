const {test, expect} = require('@playwright/test');


test('Page Loign', async ({page}) => {
    //Locators 
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinbutton = page.locator('#signInBtn');
    const dropdown = page.locator('.form-group select');
    const dropdown1 = page.locator('select.form-control');
    const docLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('consult');
    await page.locator('.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.checkmark').nth(1).isChecked());
    await expect(page.locator('.checkmark').nth(1)).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    //await expect(page.locator('#terms')).not.toBeChecked();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(docLink).toHaveAttribute('class', 'blinkingText');



    //await page.pause();




})

test(('@new page handel'), async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    //locators
     const username = page.locator('#username');
     const docLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        docLink.click()
    ])
    //locator
    const textlink = newpage.locator('.red');
    const text = await textlink.textContent();
// Diffrence between textcontent and inputvalue
// textcontent is used to get the text of the element statically which is present in the DOM
// inputvalue is used to get the value of the input field dynamically during the execution of the test case. 
// It is used to get the value of the input field which is entered by the user or set by the application during the test execution.

    console.log(text);
    const email = text.split('@');
    const domain = email[1].split(' ') [0];
    console.log(domain);

    await username.fill(domain);
    console.log(await username.inputValue());




})

/*     Rahul sheety code
test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })
 
*/