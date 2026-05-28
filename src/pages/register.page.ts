import { expect, Locator, Page }  from '@playwright/test';

const REGISTER_URL = "https://parabank.parasoft.com/parabank/register.htm";

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phone: Locator;
    readonly ssn: Locator;
    readonly userName: Locator
    readonly password: Locator;
    readonly confirmPassword: Locator

    readonly registerButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstName = page.locator('[id="customer.firstName"]');
        this.lastName = page.locator('[id="customer.lastName"]');
        this.address = page.locator('[id="customer.address.street"]');
        this.city = page.locator('[id="customer.address.city"]');
        this.state = page.locator('[id="customer.address.state"]');
        this.zipCode = page.locator('[id="customer.address.zipCode"]');
        this.phone = page.locator('[id="customer.phoneNumber"]');
        this.ssn = page.locator('[id="customer.ssn"]');
        this.userName = page.locator('[id="customer.username"]');
        this.password = page.locator('[id="customer.password"]');
        this.confirmPassword = page.locator('[id="repeatedPassword"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    async goto(): Promise<void> {
        await this.page.goto(REGISTER_URL, { waitUntil: 'domcontentloaded' });
        await this.expectLoaded();
    }

    private async expectLoaded(): Promise<void> {
        await expect(this.registerButton).toBeVisible();
    }
}