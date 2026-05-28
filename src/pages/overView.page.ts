import { expect, Locator, Page }  from '@playwright/test';

export const OVERVIEW_URL = "https://parabank.parasoft.com/parabank/overview.htm";

export class OverviewPage {
    readonly page: Page;

    readonly pageHeading: Locator;
    readonly accountTable: Locator;

    constructor(page: Page){
        this.page = page;

        this.pageHeading = page.getByRole('heading', { name: 'Accounts Overview' });
        this.accountTable = page.locator('#accountTable');
    }

    async expectLoaded(): Promise<void>{
        await expect(this.page).toHaveURL(/\/overview\.htm$/);
        await expect(this.pageHeading).toBeVisible();
        await expect(this.accountTable).toBeVisible();
    }
}
