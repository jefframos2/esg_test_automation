// Libraries
import { test as setup, expect } from '@playwright/test';

// Page Object Models
import { LoginPage } from '../page_objects/login_page';

// Test Data
import { users } from '../data/users';

const adminLoginSession = '.auth/adminUser.json';

setup('Authenticate as Admin/Developer user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // baseUrl is in playwright.config.js
  await loginPage.goto('/');
  await loginPage.login(users.admin.username, users.admin.password);

  // Wait for the user to be redirected to home page to ensure that login process has been completed before storing the login cookies
  await expect(page).toHaveURL('/cms/dashboard/home.html');

  // Store login cookies so we don't have to login on every test. The new browser context created in eact test can just reuse the existing login cookies
  await page.context().storageState({ path: adminLoginSession });
});
