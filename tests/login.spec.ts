import test from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";
import { OverviewPage } from "../src/pages/overView.page";

import loginValidData from '../src/data/login/login_valid.data.json';
import logininvalidData from '../src/data/login/login_invalid.data.json';   
import { expect } from "@playwright/test";


test.describe('Login Tests', () => {

    test('@login_valid should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.userName.fill(loginValidData[0].username);
        await loginPage.password.fill(loginValidData[0].password);
        await loginPage.loginButton.click();

        
        const overviewPage = new OverviewPage(page);
        await overviewPage.expectLoaded();
    });

    test('@login_invalid should fail to login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(); 
        await loginPage.userName.fill(logininvalidData[0].username);
        await loginPage.password.fill(logininvalidData[0].password);
        
        await loginPage.loginButton.click();

        await loginPage.error.waitFor({ state: 'visible' });
        await expect(loginPage.error).toHaveText(logininvalidData[0].expected);
    }); 
});