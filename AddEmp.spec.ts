import { test, expect } from '@playwright/test';
import path from 'path';

test('Admin adding new emp', async ({ page }) => {
  // Going to the Login Page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Inputting user info which are username and password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Waiting for dashboard
  await page.waitForSelector('text=Dashboard');

  // 3. Navigating to PIM to add employee
  await page.click('text=PIM'); // Goes to the PIM menu
  await page.click('button:has-text("Add Employee")');

  // 4. Fill in employee details
  const firstName = 'John';
  const middleName = 'M';
  const lastName = 'Doe' + Date.now(); // ensure uniqueness
  await page.fill('input[name="firstName"]', firstName);
  await page.fill('input[name="middleName"]', middleName);
  await page.fill('input[name="lastName"]', lastName);

  // Capture Employee ID for later verification
  const employeeId = await page.getAttribute('input[name="employeeId"]', 'value');

  // 6. Save employee
  await page.click('button:has-text("Save")');

  // 7. Verify employee appears in employee list
  await page.click('text=Employee List'); // go to Employee List
  await page.fill('input[placeholder="Employee Name"]', `${firstName} ${middleName} ${lastName}`);
  await page.press('input[placeholder="Employee Name"]', 'Enter');

  const employeeRow = page.locator(`text=${firstName} ${middleName} ${lastName}`);
  await expect(employeeRow).toBeVisible();

  // 8. Verify Employee ID is unique
  const idCell = page.locator(`text=${employeeId}`);// Finds employee id and assigns to IdCell
  await expect(idCell).toBeVisible();

});
