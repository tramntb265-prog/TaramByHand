import { expect, Locator, Page }  from '@playwright/test';

const OPEN_ACCOUNT_URL = "https://parabank.parasoft.com/parabank/openaccount.htm";
export type AccountType = 'CHECKING' | 'SAVINGS';

const ACCOUNT_TYPE_VALUE: Record<AccountType, string> = {
    CHECKING: '0',
    SAVINGS: '1',
};

export class OpenAccountPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly accountTypeSelect: Locator;
    readonly fromAccountSelect: Locator;
    readonly openNewAccountButton: Locator; 
    readonly accountOpenedHeading: Locator;
    readonly accountOpenedMessage: Locator;
    readonly accountOpenedID: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'Open New Account' });
        this.accountTypeSelect = page.locator('#type');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.accountOpenedHeading = page.getByRole('heading', { name: 'Account Opened!' });
        this.accountOpenedMessage = page.locator('#openAccountResult > p', { hasText: 'Congratulations, your account is now open.' });
        this.accountOpenedID = page.locator('#newAccountId');
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

    async expectAccountOpened(): Promise<void> {
        await expect(this.accountOpenedHeading).toBeVisible();
        await expect(this.accountOpenedMessage).toBeVisible();
        await expect(this.accountOpenedID).toBeVisible();
    }

    async selectAccountType(accountType: AccountType): Promise<void> {
        await this.accountTypeSelect.selectOption(ACCOUNT_TYPE_VALUE[accountType]);
    }

    async selectFromAccountByIndex(oneBasedIndex: number): Promise<void> {
        if (oneBasedIndex < 1) {
            throw new Error(`fromAccountIndex must be >= 1. Received: ${oneBasedIndex}`);
        }
        await this.fromAccountSelect.selectOption({ index: oneBasedIndex - 1 });
    }

}
