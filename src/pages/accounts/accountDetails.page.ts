import { Page, Locator, expect } from "@playwright/test";

const ACCOUNT_DETAILS_URL = 'https://parabank.parasoft.com/parabank/activity.htm';


export class AccountDetailsPage {
    readonly page: Page;
    readonly accountDetailsHeading: Locator;
    readonly accountDetailsTable: Locator;
    readonly accountNumber: Locator;
    readonly accountType: Locator;
    readonly accountBalance: Locator;
    readonly accountAvailableBalance: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountDetailsHeading = page.getByRole('heading', { name: 'Account Details' });
        this.accountDetailsTable = page.getByRole('table');
        this.accountNumber = page.locator('#accountId');
        this.accountType = page.locator('#accountType');
        this.accountBalance = page.locator('#balance');
        this.accountAvailableBalance = page.locator('#availableBalance');
    }

    async goto(accountId: string): Promise<void> {
        await this.page.goto(`${ACCOUNT_DETAILS_URL}?id=${accountId}`, { waitUntil: 'domcontentloaded' });
        await this.expectLoaded();
    }   

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`^${ACCOUNT_DETAILS_URL.replace('.', '\\.')}\\?id=\\d+$`));
        await expect(this.accountDetailsHeading).toBeVisible();
    }
}