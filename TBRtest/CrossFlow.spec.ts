import { test, expect, Page, chromium, Browser, BrowserContext } from '@playwright/test';

test('BulkLogin - Admin uploads and Client verifies', async () => {
  test.setTimeout(120_000);

  const browser: Browser = await chromium.launch({ headless: false });

  // ---------- ADMIN CONTEXT ----------
  const adminContext: BrowserContext = await browser.newContext();
  const adminPage: Page = await adminContext.newPage();
  console.log('🔐 [Admin] Opening admin login page...');

  await adminPage.goto('https://admin.staging.tbrinsightcenter.com');
  await expect(adminPage).toHaveTitle(/TBR - Admin\s*\|\s*Login/);
  console.log('✅ [Admin] Page loaded');

  await adminPage.fill('#loginEmail', 'bghongade@york.ie');
  await adminPage.fill('#loginPassword', 'Test@123');
  await adminPage.getByRole('button', { name: 'Submit' }).click();
  console.log('✅ [Admin] Logged in');

  await adminPage.locator('xpath=(//*[@class="datagrid_tooltip"])[1]').click();
  await adminPage.locator('xpath=(//*[@class="material-icons manage_content_action icon-fs-16 mr-1"])[1]').click();
  console.log('📝 [Admin] Clicked manage content');

  const randomText = `RandomKeyword_${Math.random().toString(36).substring(2, 8)}`;
  await adminPage.fill('xpath=//*[@class="modal-body"]/textarea', randomText);
  console.log(`📝 [Admin] Entered random keyword: ${randomText}`);

  await adminPage.locator('xpath=//*[@class="modal-right-btn modal-btn btn btn-secondary"]').click();
  console.log('✅ [Admin] Saved content');

  

  await adminPage.getByText('Submit').click();
  await adminPage.getByText('Save & Submit').click();
  await adminPage.locator('xpath=(//*[@class="material-icons-outlined text-blue-clr icon-fs-20"])[1]').click();

  await adminPage.locator('xpath=//*[@class="btn btn-custom btn-success icon-text-btn title-btn d-inline-flex align-items-center mb-3"]').click();
  await adminPage.locator('xpath=//*[@class="modal-right-btn modal-btn btn btn-secondary"]').click();
  await adminPage.locator('xpath=(//*[@class="material-icons-outlined text-blue-clr icon-fs-20"])[1]').click();
  await adminPage.locator('xpath=//*[@class="btn btn-custom btn-success icon-text-btn title-btn d-inline-flex align-items-center mb-3"]').click();
  await adminPage.getByText('Confirm').click();
  console.log('✅ [Admin] Published');
  await adminPage.locator('xpath=//*[@title="List"]').click();
  await adminPage.locator('xpath=(//*[@class="datagrid_tooltip"])[1]').click();

  await adminPage.reload();
await adminPage.waitForTimeout(3000); 


  //await adminPage.click('(//*[@class="material-icons-outlined text-blue-clr icon-fs-20"])[1]');
  const adminTitleLocator = adminPage.locator(`h5:has-text("${randomText}")`);
  const adminTitle = await adminTitleLocator.innerText();
  console.log('📄 [Admin] Content title:', adminTitle);

  await adminPage.waitForTimeout(6000); // Optional wait before switching

  // ---------- CLIENT CONTEXT ----------
  const clientContext: BrowserContext = await browser.newContext();
  const clientPage: Page = await clientContext.newPage();
  console.log('🔐 [Client] Opening client login page...');

  await clientPage.goto('https://staging.tbrinsightcenter.com');
  await clientPage.fill('#loginEmail', 'bghongade+c@york.ie');
  await clientPage.fill('#loginPassword', 'Test@123');
  await clientPage.getByRole('button', { name: 'Submit' }).click();
  console.log('✅ [Client] Logged in');

  await clientPage.waitForTimeout(5000); // Wait for report to reflect
  await clientPage.locator('xpath=(//*[@class="report-title_details table-report-title"])[1]').click();

  const clientTitleLocator = clientPage.locator('xpath=(//*[@class="heading mb-3 font-default"])[1]');
  const clientTitle = await clientTitleLocator.innerText();
  console.log('📄 [Client] Verified published title:', clientTitle);

  expect(clientTitle.trim()).toBe(adminTitle.trim());
  console.log('✅ Title matches between Admin and Client');

  await browser.close();
});
