import { expect, Locator, Page }  from '@playwright/test';

export const INDEX_URL = "https://parabank.parasoft.com/parabank/index.htm";

export class IndexPage {
    readonly page: Page;

    readonly userName: Locator;
    readonly password: Locator;

    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.userName = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');

        this.loginButton = page.getByRole('button', { name: 'Log In' });

    }

      async goto(): Promise<void> {
    await this.page.goto(INDEX_URL, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

}
