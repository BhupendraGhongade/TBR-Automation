import { test, expect ,Page} from '@playwright/test';
import path from 'path';

test('BulkLogin', async ({ page }) => {
  await page.goto('https://admin.staging.tbrinsightcenter.com');
  await expect(page).toHaveTitle(/TBR - Admin\s*\|\s*Login/);

  // Login
  await page.fill('#loginEmail', 'bghongade@york.ie');
  await page.fill('#loginPassword', 'Test@123');
  await page.click('#root > div > div > main > div > div > aside:nth-child(2) > div > form > div:nth-child(6) > button');

  // Navigate to upload section
  await page.click('#root > div > div > main > div > div:nth-child(1) > aside.nav_sidebar > div > ul > div:nth-child(3) > li > a > span.material-icons-round.toggle-menu.icon-fs-20');
  await page.click('#root > div > div > main > div > div:nth-child(1) > aside.nav_sidebar > div > ul > div.opened.parent-nav-collapsible-item > li > ul > li:nth-child(2) > a > span.material-icons-outlined');
  await page.click('#root > div > div > main > div > div:nth-child(1) > aside.main_content > div > div.comapnay_tbl > div > div.row.align-items-center.flex-wrap-reverse > div:nth-child(3) > div > div > aside > button.btn.btn-custom.btn-primary.icon-text-btn.title-btn.mr-2.d-inline-flex.align-items-center.mb-3.text-nowrap');

  // Click the "Browse" button to trigger file input
  await page.click('body > div:nth-child(7) button:has-text("Browse")');

  // Get hidden input[type="file"]
  const filePath = path.resolve('/Users/bghongade/Downloads/Automation1.xlsx');
  const fileInputHandle = await page.$('input[type="file"]');

  // Upload the file even if input is hidden
  if (fileInputHandle) {
    await fileInputHandle.setInputFiles(filePath);
  } else {
    throw new Error('File input element not found');
  }
  await page.click('body > div:nth-child(7) > div > div.modal.fade.show > div > div > form > div.modal-footer > button.modal-btn.btn.btn-primary');

  await page.waitForTimeout(20000); // optional

});
