const { test, expect , request } = require('@playwright/test');
 
const loginPayload = {userEmail: "ahmedamer018@gmail.com", userPassword: "Ahmed_123"};
let token;

 test.beforeAll( async()=>{
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client" , 
    {
        data : loginPayload
    } ) //200, 201 "sucess code"

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponsejson = loginResponse.json;
    token = loginResponsejson.token;
    console.log(token);

 });

//  test.beforeEach( ()=>{


//  })

test('@End to End test', async ({ page }) => {
   
   page.addInitScript( value =>{
      window.localStorage.setItem('token' , value)
   }, token);
   //variables
   const productname = 'ZARA COAT 3';
   const email ="";
   //Locators
   // const email = page.locator("#userEmail");
   // const password = page.locator("#userPassword");
   // const loginbutton = page.locator("#login");
   const products = page.locator(".card-body");

   // //test case steps
   // await email.fill("ahmedamer018@gmail.com");
   // await password.fill("Ahmed_123");
   // await loginbutton.click();
// waitForLoadState('networkidle') is used to wait for all network calls to complete before proceeding with the next step in the test case. This is useful when the page is making multiple network requests and you want to ensure that all of them have completed before interacting with the page.
   // await page.waitForLoadState('networkidle');
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

   const count = await products.count();
   console.log(count);
   for (let i=0; i < count; ++i)
   {
      if ( await products.nth(i).locator("b").textContent() === productname)
      {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
  await page.locator('[routerlink="/dashboard/cart"]').click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text= Checkout").click();
  //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
  await page.locator('[placeholder="Select Country"]').pressSequentially("eg");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const dropdowncount = await dropdown.locator('[type="button"]').count();
  console.log(dropdowncount);

  for (let i=0 ; i< dropdowncount ; i++)
  {
     const text = await dropdown.locator('[type="button"]').nth(i).textContent();
     if (text == " Egypt")
     {
         await dropdown.locator('[type="button"]').nth(i).click();
         break;
     }
  }
  
  await expect(page.locator('.user__name [type="text"]').first()).toHaveText("ahmedamer018@gmail.com");
  
  await page.locator('select.input.ddl').first().selectOption('08');
  await page.locator('select.input.ddl').last().selectOption('28');
  //await page.locator('[fdprocessedid="21xru3"]').fill("123");
  await page.locator('.field.small .input.txt').first().fill('123');
  //await page.locator('[fdprocessedid="2g2ioj"]').fill("AhmedAmer");
  await page.locator('.field .input.txt').nth(2).fill("ahmedamer");
  //await page.locator('[fdprocessedid="00k7o"]').fill("rahulshettyacademy");
  await page.locator('.field.small .input.txt').last().fill('rahulshettyacademy');
  await page.locator('[type="submit"]').click();

  await expect (page.locator('text= * Coupon Applied')).toBeVisible();

  await page.locator('.action__submit ').click();

  await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

  const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  console.log(orderID);

  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('tbody').waitFor();

  const tableRows = await page.locator('tbody tr');
  for (let i=0; i< await tableRows.count() ; i++)
  {
      const actualorderID = await tableRows.nth(i).locator('th').textContent();
      if (orderID.includes(actualorderID))
      {
         await tableRows.nth(i).locator('button').first().click();
         break;
      }
  }

  const summaryID = await page.locator('.col-text').first().textContent();
  expect(orderID.includes(summaryID)).toBeTruthy();
}) 