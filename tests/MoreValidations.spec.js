const {test , expect} = require('@playwright/test');

//test.describe.configure({mode : 'parallel'});
test.describe.configure({mode : 'serial'});

test ("@web Popup validations" , async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog" , dialog => dialog.accept());
    await page.locator("#name").fill("AHMED");
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content a").nth(0).click();

    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framespage.locator(".test h2").textContent();
    console.log(textcheck.split(" ")[1]);

})

test('Screen shots and visual comparasions' , async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path : 'partial screenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path : 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('visual' , async({page})=>{

    //await page.goto("https://flightaware.com/");
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})