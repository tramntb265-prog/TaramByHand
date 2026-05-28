import { expect, Locator, Page }  from '@playwright/test';

const OPEN_ACCOUNT_URL = "https://parabank.parasoft.com/parabank/openaccount.htm";

export class OpenAccountPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly accountTypeSelect: Locator;
    readonly fromAccountSelect: Locator;
    readonly openNewAccountButton: Locator; 

    constructor(page: Page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'Open New Account' });
        this.accountTypeSelect = page.locator('#type');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    }   

    async goto(): Promise<void> {
        await this.page.goto(OPEN_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
        await this.expectLoaded();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/openaccount\.htm$/);
        await expect(this.pageHeading).toBeVisible();
        await expect(this.accountTypeSelect).toBeVisible();
        await expect(this.fromAccountSelect).toBeVisible();
        await expect(this.openNewAccountButton).toBeVisible();
    }

}
