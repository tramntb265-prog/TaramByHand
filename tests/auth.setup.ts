import {test as setup, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { OverviewPage } from '../src/pages/overView.page';

const authFile = 'auth.json';

const username = 'taramN';
const password = 'PasswordA@12';

setup('authentication', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const overviewPage = new OverviewPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded(); 
    await loginPage.userName.fill(username);
    await loginPage.password.fill(password);
    await loginPage.loginButton.click();
    
    try {
        await overviewPage.expectLoaded();
    } catch (error) {
        console.error('Login failed:', error);
        console.error('register a new user');

        await page.goto('https://parabank.parasoft.com/parabank/register.htm', { waitUntil: 'domcontentloaded' });
        await page.locator('input[name="customer.firstName"]').fill('Tara');
        await page.locator('input[name="customer.lastName"]').fill('M');
        await page.locator('input[name="customer.address.street"]').fill('123 Main St');
        await page.locator('input[name="customer.address.city"]').fill('Anytown');
        await page.locator('input[name="customer.address.state"]').fill('CA');
        await page.locator('input[name="customer.address.zipCode"]').fill('12345');
        await page.locator('input[name="customer.phoneNumber"]').fill('555-123-4567');
        await page.locator('input[name="customer.ssn"]').fill('123-45-6789');
        await page.locator('input[name="customer.username"]').fill(username);
        await page.locator('input[name="customer.password"]').fill(password);
        await page.getByRole('button', { name: 'Register' }).click();

        const rightPanel = page.locator('#rightPanel');
        await expect(rightPanel.locator('h1.title')).toHaveText(`Welcome ${username}`);
        await expect(rightPanel.locator('p')).toHaveText('Your account was created successfully. You are now logged in.');

    }

    await page.context().storageState({ path: authFile });
});