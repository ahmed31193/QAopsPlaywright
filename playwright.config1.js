// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
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
  testMatch : '**/*.spec.js',
  //retries : 1,
  workers : 1,
  // timeout for all test
  timeout: 30*1000,
  //timeout relates to assertion 
  expect: {
      timeout: 5000,
  },

  //reporting the result in HTML
  reporter : 'html',
  projects : [
    {  
    name : 'MicrosoftEdge',
      use: {
          actionTimeout: 10 * 1000,
          navigationTimeout: 30 * 1000,
          ...devices['Desktop Edge'],
          channel: 'msedge', 
          //browserName : 'chromium',
          headless : false,
          screenshot : 'on',
        //  trace : 'retain-on-failure',
          trace : 'on',
          // ...devices['Galaxy S24'],
          }
    },
    {
    name : 'Chrome',
      use: {
          actionTimeout: 10 * 1000,
          navigationTimeout: 30 * 1000,
          browserName : 'chromium',
          headless : false,
          screenshot : 'on',
          video : 'retain-on-failure',
        //  trace : 'retain-on-failure',
          trace : 'on',
          ignoreHttpsErrors : true,
          Permissions : ['goelocation'],
          viewport: null,   // ← لازم تشيل الـ viewport الثابت
          launchOptions: {
          args: ['--start-maximized'],   // ← يفتح الشاشة full بحجم الشاشة الحقيقي
            }
          }
    }
  ]
  
});
module.exports = config
