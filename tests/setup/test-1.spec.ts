import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://chw-web-dev.azurefd.net/');
  await page.goto('https://auth.dev.crugroup.com/u/login?state=hKFo2SByUTVjOHNVVU04dTdlV3JESi1YQUs1a2VpYW4xMlRPTKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFR6b1BfM1k5WnlSUFEtRTZ4ckw1WmdDcWJIMTVWdEpRo2NpZNkgQldHMENDaXE4T291b3VJeGhQRUFIN3d0TlQza3Q3OTc');
  await page.getByLabel('Email').click();
  await page.getByLabel('Password').click();
  await page.getByText('Email Email Password Password Show password Hide password Show password Hide pas').click();
  await page.getByLabel('Password').click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Forgotten your password?' }).click();
  await page.getByLabel('Email address').click();
  await page.getByText('Forgot Your Password? Enter your email address and we will send you instructions').click();
  await page.getByText('Forgot Your Password? Enter your email address and we will send you instructions').click();
  await page.getByRole('link', { name: 'Back to CRU Online (DEV)' }).click();
});