import { expect, Locator, Page }  from '@playwright/test';
import { OverviewPage } from './overView.page';

export const INDEX_URL = "https://parabank.parasoft.com/parabank/index.htm";

export class LoginPage {
    readonly page: Page;

    readonly userName: Locator;
    readonly password: Locator;

    readonly loginButton: Locator;
    readonly error: Locator;

    constructor(page: Page){
        this.page = page;

        this.userName = page.locator('input[name="username"]'); 
        this.password = page.locator('input[name="password"]');

        this.loginButton = page.getByRole('button', { name: 'Log In' });

        this.error = page.locator('#rightPanel .error');

    }

    async goto(): Promise<void> {
        await this.page.goto(INDEX_URL, { waitUntil: 'domcontentloaded' });
        await this.expectLoaded();
    }

    async expectLoaded(): Promise<void> {
        //await expect(this.page).toHaveURL(/\/index\.htm$/);
        //console.log(await this.userName.count());
        await expect(this.userName).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

}
