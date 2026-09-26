const { test, expect } = require('@playwright/test');
 
 
 
/*
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   // waiting for all network calls come first
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
 
})
*/

test('@End to End test', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client");
   //variables
   const productname = 'ZARA COAT 3';
   //Locators
   const email = page.locator("#userEmail");
   const password = page.locator("#userPassword");
   const loginbutton = page.locator("#login");
   const products = page.locator(".card-body");

   //test case steps
   await email.fill("ahmedamer018@gmail.com");
   await password.fill("Ahmed_123");
   await loginbutton.click();
// waitForLoadState('networkidle') is used to wait for all network calls to complete before proceeding with the next step in the test case. This is useful when the page is making multiple network requests and you want to ensure that all of them have completed before interacting with the page.
   await page.waitForLoadState('networkidle');
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

/*
            Rahul shetty code
const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});

///////////////////////////////  rahulshetty code#2  ///////////////////////////////

const { test, expect } = require('@playwright/test');
 
 
 
 
const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
*/