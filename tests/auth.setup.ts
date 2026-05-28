import {test as setup, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

setup('authentication', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded(); 
    await loginPage.userName.fill('taramN');
    await loginPage.password.fill('PasswordA@12');
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/\/overview\.htm$/);


});