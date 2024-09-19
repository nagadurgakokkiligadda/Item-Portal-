import { Login } from "../POM/Login";
import { Test } from "../POM/test";
const { test, expect } = require('@playwright/test');

test("create user with valid details", async ({ page }) => {
    const login = new Login(page);
    await login.launchPage();
    await login.loginDetails('7569147913');

    const test = new Test(page);
    await test.launchUserPage();

    
    await test.userCreation('Test User', '7569147910', 'test@gmail.com');

    await test.userCreation('Test User', '7569147910', 'Invalid Email');
    await expect(page.locator(test.emailErr)).toBeVisible();

    await test.userCreation('Test User', '7560', 'test@gmail.com');
    await expect(page.locator(test.mobileErr)).toBeVisible();
});

test("create user with Null values", async ({ page }) => {
    const login = new Login(page);
    await login.launchPage();
    await login.loginDetails('7569147913');

    const test = new Test(page);
    await test.launchUserPage();

    await test.userCreation('', '', '');
    await expect(page.locator(test.fullNameErr)).toBeVisible();
    await expect(page.locator(test.mobileErr)).toBeVisible();
    await expect(page.locator(test.emailErr)).toBeVisible();
    await expect(page.locator(test.roleErr)).toBeVisible();
});

test("create user missing values", async ({ page }) => {
    const login = new Login(page);
    await login.launchPage();
    await login.loginDetails('7569147913');

    const test = new Test(page);
    await test.launchUserPage();
    await test.userCreation('', '7569147913', 'test@gmail.com');
    await expect(page.locator(test.fullNameErr)).toBeVisible();

    await test.userCreation('Dummy', '', '');
    await expect(page.locator(test.mobileErr)).toBeVisible();
    await expect(page.locator(test.emailErr)).toBeVisible();
});

test.only("Creating users with maximum lengths", async ({ page }) => {
    const login = new Login(page);
    await login.launchPage();
    await login.loginDetails('7569147913');

    const test = new Test(page);
    await test.launchUserPage();
    const maxName = 'b'.repeat(100);
    const maxEmail = 'b'.repeat(100) + '@test.com';
    const maxPhone = '9'.repeat(15);
    await test.userCreation(maxName, maxEmail, maxPhone);
    await page.waitForTimeout(3000);
    const { fullNameLength, emailLength, phoneNumberLength } = await test.getFieldLengths();
    console.log(`Returned Full Name length: ${fullNameLength}`);
    console.log(`Returned Email length: ${emailLength}`);
    console.log(`Returned Phone Number length: ${phoneNumberLength}`);
    if (fullNameLength > 100) {
        console.error(`Full Name exceeds limit: ${fullNameLength} characters`);
    }

    if (emailLength > 100) {
        console.error(`Email exceeds limit: ${emailLength} characters`);
    }

    if (phoneNumberLength > 15) {
        console.error(`Phone Number exceeds limit: ${phoneNumberLength} characters`);
    }
});
