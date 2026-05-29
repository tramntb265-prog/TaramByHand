import { Page, Locator, expect } from "@playwright/test";

const CLIENT_LIST_URL = 'https://dev.flexigrow.app/client/list/';

export class ClientListPage {
    readonly page: Page;
    readonly clientTable: Locator;
    readonly clientRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clientTable = page.locator('table');
        this.clientRows = this.clientTable.locator('tbody tr');
    }

    async goto(): Promise<void> {
        await this.page.goto(CLIENT_LIST_URL, { waitUntil: 'domcontentloaded' });
        await this.expectLoaded();
    }

    async expectLoaded(): Promise<void> {
        await expect(this.clientTable).toBeVisible();
    }

}