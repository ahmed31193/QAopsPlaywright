// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//const {devices} = require('@playwright/test') 

const config =({
  testDir: './tests',
  testMatch : '**/*.spec.{js,ts}',
  retries : 0,

  // timeout for all test
  timeout: 30*1000,
  //timeout relates to assertion 
  expect: {
      timeout: 5000,
  },

  //reporting the result in HTML
  // reporter : 'html',
    reporter: [
    ['html'],
    ['allure-playwright'],
  ],
  //name : 'Microsoft Edge',
  use: {
      actionTimeout: 10 * 1000,
      navigationTimeout: 30 * 1000,
      // ...devices['Desktop Edge'],
      // channel: 'msedge', 
      browserName : 'chromium',
      // headless : false,
      headless: !!process.env.CI,
      screenshot : 'on',
    //  trace : 'retain-on-failure',
      trace : 'on',
  },

});
module.exports = config
