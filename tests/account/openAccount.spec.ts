import {test, expect} from '@playwright/test';
import { AccountType, OpenAccountPage } from '../../src/pages/accounts/openAccount.page';

import openAccount_validData from '../../src/data/openAccount/openAccount_valid.json';

type OpenAccountData = {
    accountType: AccountType;
    fromAccountIndex: number;
    expected: string;
};

const testData = openAccount_validData as OpenAccountData[];

test.describe('Open Account Tests', () => {
    let openAccountPage: OpenAccountPage;

    test.beforeEach(async ({ page }) => {
        openAccountPage = new OpenAccountPage(page);
        await openAccountPage.goto();
        await openAccountPage.expectLoaded();
    });

    test('@open_account should open a new Checking account successfully', async ({ page }) => {
        await openAccountPage.selectAccountType(testData[0].accountType);
        await openAccountPage.selectFromAccountByIndex(testData[0].fromAccountIndex);
        await openAccountPage.openNewAccountButton.click();
        await openAccountPage.expectAccountOpened();
    });

    test('@open_account should open a new Savings account successfully', async ({ page }) => {
        await openAccountPage.selectAccountType(testData[1].accountType);
        await openAccountPage.selectFromAccountByIndex(testData[1].fromAccountIndex);
        await openAccountPage.openNewAccountButton.click();
        await openAccountPage.expectAccountOpened();
    });
});