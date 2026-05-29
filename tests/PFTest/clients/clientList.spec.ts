import { test } from '@playwright/test';
import { ClientListPage } from '../../../src/pages/FGPages/clientList.page';

test.describe('Client List Tests', () => {
    let clientListPage: ClientListPage;

    test.beforeEach(async ({ page }) => {
        clientListPage = new ClientListPage(page);
        await clientListPage.goto();
    });

    test('@client_list should display the client list page', async ({ page }) => {
        await clientListPage.expectLoaded();
    }); 
});