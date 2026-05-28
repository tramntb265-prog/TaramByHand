import {test, expect} from '@playwright/test';
import { OpenAccountPage } from '../src/pages/openAccount.page';

import openAccount_validData from '../src/data/openAccount/openAccount_valid.json';

test.describe('Open Account Tests', () => {

    test('@open_account should open a new account successfully', async ({ page }) => {
        const openAccountPage = new OpenAccountPage(page);
        await openAccountPage.goto();
        await openAccountPage.expectLoaded();

        for (const data of openAccount_validData) {
            await openAccountPage.openAccount(data.accountType, data.fromAccount);
            await openAccountPage.expectSuccess();
        }
    });
});