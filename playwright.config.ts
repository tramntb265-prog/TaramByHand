import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Capitalized CI fixes potential reference issues */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // 1. Define the unique global authentication step
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts', // Matches your setup file pattern
      retries: 0,
      workers: 1,
    },

    // 2. Main browsers depending on the setup completing first
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json', // Automatically injects session
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});
