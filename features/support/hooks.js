const { Before, After, AfterStep, BeforeStep ,Status } = require('@cucumber/cucumber');
const { POManager } = require('../../ObjectPages/POManager');
const playwright = require('@playwright/test');
const path = require('node:path');


Before({tags : "@Regression or @Validations"},async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poMnager = new POManager(this.page);
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'TC fail.png' });
    }
});

After(async function () {
    console.log("Good, the test is finished successfully :)");
});