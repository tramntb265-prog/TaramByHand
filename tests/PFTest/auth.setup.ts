import { test as setup, expect } from '@playwright/test'; // Fixed: Must import 'test as setup'
import { LoginPage } from '../../src/pages/FGPages/login.page';
import fs from 'fs';

const authFile = 'PFauth.json';

setup('authentication', async ({ page }) => {
    // 1. Session Cache Check
    if (fs.existsSync(authFile)) {
        try {
            console.log('🔄 Found existing session. Verifying validity...');
            const storageState = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
            
            // Inject previously saved cookies
            await page.context().addCookies(storageState.cookies);
            await page.goto('https://dev.flexigrow.app/dashboard', { waitUntil: 'domcontentloaded' });
            
            // VERIFY: If session expired, the server will redirect to login, causing this to time out
            await page.waitForURL('https://dev.flexigrow.app/dashboard', { timeout: 30000 });
            
            console.log('✅ Session is still valid! Skipping manual login UI.');
            return; // Exit early safely
        } catch (error) {
            console.log('❌ Cached session expired or invalid. Launching login UI...');
            await page.context().clearCookies(); // Clean slate for form fields
        }
    }

    // 2. Fallback Login Flow (Triggered if file is missing OR session is expired)
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.emailInput.fill('testy131@yopmail.com');

    await loginPage.signInButton.click();
    await loginPage.expectPasswordStep();

    await loginPage.passwordInput.fill('PasswordA@12');
    await loginPage.continueButton.click();
    await loginPage.expectMfaStep();

    // 3. Manual MFA Execution Block
    console.log('⚠️ Test paused! Enter the OTP in the browser window, then click Resume in the Playwright Inspector.');
    await page.pause(); 

    await loginPage.continueButton.click();
    await loginPage.expectLoggedIn();

    // 4. Persistence Block
    await page.context().storageState({ path: authFile });
    console.log(`💾 New authenticated session safely written to ${authFile}`);
});
