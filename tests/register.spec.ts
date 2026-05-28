import  { test } from '@playwright/test';
import { expect } from '@playwright/test';  

import registerValidData from '../src/data/register/register_valid.json';
import { RegisterPage } from '../src/pages/register.page';

test.describe('Register Tests', () => {

    test('@register_valid should register successfully with valid data', async ({ page }) => {
        // Implement the test for successful registration using valid data
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.firstName.fill(registerValidData[0].firstName);
        await registerPage.lastName.fill(registerValidData[0].lastName);
        await registerPage.address.fill(registerValidData[0].address);
        await registerPage.city.fill(registerValidData[0].city);
        await registerPage.state.fill(registerValidData[0].state);
        await registerPage.zipCode.fill(registerValidData[0].zipCode);
        await registerPage.phone.fill(registerValidData[0].phone);
        await registerPage.ssn.fill(registerValidData[0].ssn);
        await registerPage.userName.fill(registerValidData[0].userName);
        await registerPage.password.fill(registerValidData[0].password);
        await registerPage.confirmPassword.fill(registerValidData[0].confirmPassword);
        await registerPage.registerButton.click();

        const rightPanel = page.locator('#rightPanel');
        await expect(rightPanel.locator('h1.title')).toHaveText(`Welcome ${registerValidData[0].userName}`);
        await expect(rightPanel.locator('p')).toHaveText('Your account was created successfully. You are now logged in.');

    });
});