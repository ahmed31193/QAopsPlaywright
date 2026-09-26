import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page : Page;
    signButton: Locator;
    username : Locator;
    password : Locator;

constructor(page : Page)
{   
    this.page = page;
    this.signButton = page.locator("#login");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
}

async goto ()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin (username : string , password : string)
{
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signButton.click();
    await this.page.waitForLoadState('networkidle');
}

}

module.exports = {LoginPage};