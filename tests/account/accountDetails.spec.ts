import {test, expect} from '@playwright/test';
import { AccountDetailsPage } from '../../src/pages/accounts/accountDetails.page';
import { AccountType, OpenAccountPage } from '../../src/pages/accounts/openAccount.page';

test.describe('Account Details Tests', () => {
    let accountDetailsPage: AccountDetailsPage;
    let accountId: string;
    let openAccountPage: OpenAccountPage;


    test.beforeEach(async ({ page }) => {
        openAccountPage = new OpenAccountPage(page);
        await openAccountPage.goto();

        await openAccountPage.selectAccountType('CHECKING');
        await openAccountPage.selectFromAccountByIndex(1);
        await openAccountPage.openNewAccountButton.click();
        await openAccountPage.expectAccountOpened();
        accountId = await openAccountPage.accountOpenedID.textContent();
        console.log(`Opened new account with ID: ${accountId}`);
    });

    test('@account_details should display correct account details for a selected account', async ({ page }) => {
        accountDetailsPage = new AccountDetailsPage(page);
        await accountDetailsPage.goto(accountId!);

        await expect(accountDetailsPage.accountNumber).toHaveText(accountId!);
        await expect(accountDetailsPage.accountType).toHaveText('CHECKING');
        await expect(accountDetailsPage.accountBalance).toHaveText('$100.00');
        await expect(accountDetailsPage.accountAvailableBalance).toHaveText('$100.00');
    });
});