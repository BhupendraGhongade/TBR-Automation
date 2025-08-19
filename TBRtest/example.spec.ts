import { test, expect,Browser,Page, firefox, BrowserContext } from '@playwright/test';
import { webkit,chromium } from '@playwright/test';

const users = [
  { email: 'bghongade@york.ie', password: 'Test@123' },
   { email: 'bghongade+pm@york.ie', password: 'Test@123' },
  { email: 'bghongade+editor@york.ie', password: 'Test@123' },
  //{ email: 'bghongade+am@york.ie', password: 'Test@123' },
  { email: 'bghongade+ra@york.ie', password: 'Test@123' },
  { email: 'bghongade+analyst@york.ie', password: 'Test@123' },
 // { email: 'bghongade+salesadmin@york.ie', password: 'Test@123' },
  { email: 'bghongade+sa@york.ie', password: 'Test@123' }, 
];
users.forEach((user, index) => {
  test(`Login test #${index + 1} for ${user.email}`, async ({ page }) => {

    await page.goto('https://admin.staging.tbrinsightcenter.com');
    await expect(page).toHaveTitle(/TBR - Admin\s+\|\s+Login/);

    await page.fill('#loginEmail', user.email);
    await page.fill('#loginPassword', user.password);
    const title=await page.title();
    await page.screenshot({path: 'homepage.png'});
    expect(title).toEqual('TBR - Admin | Login');
    await console.log('home page title',title)
    await page.click('#root > div > div > main > div > div > aside:nth-child(2) > div > form > div:nth-child(6) > button');
    await page.click('#root > div > div > main > div > div:nth-child(1) > aside.main_content > div > div.d-flex.align-items-center.pt-3.flex-wrap.title-section.breadcrumb-mb-0 > div > div.ml-3 > button');
    const timestamp = Date.now();
const uniqueName = `playwright-${timestamp}`;

await page.fill('#companyName', uniqueName);
await page.fill('#displayName', uniqueName);
await page.fill('#stockTicker', uniqueName);
await page.click('#rw_1_input > div.rw-widget-input.rw-widget-picker.rw-widget-container > div');
await page.click('#rw_1_listbox_active_option');
await page.click('#rw_2_input > div > div');
await page.click('#rw_2_listbox_active_option');
await page.click('#rw_3_input > div.rw-widget-input.rw-widget-picker.rw-widget-container > div');
await page.click('#rw_3_listbox_active_option');
await page.click('#rw_4_input > div > div');
await page.click('#rw_4_listbox_active_option');
await page.click('#lor > div > div > div > div');
await page.click('#rw_5_listbox_active_option');
await page.click('body'); // Often works if body has space


await page.click('#root > div > div > main > div > div:nth-child(1) > aside.main_content > div > div > div > div > form > div > div.card-body > div:nth-child(4) > div > div > div.row > div.col-sm-12.text-right > button');


await page.selectOption('select[name="coverageby"]', { index: 2 }); // Company Profile
await page.click('#root > div > div > main > div > div:nth-child(1) > aside.main_content > div > div > div > div > form > div > div.card-body > div.form-submit-buttons > div > div > div > button.btn.btn-primary.modal-btn');
//await page.click('#root > div > div > main > div > div:nth-child(1) > aside.main_content > div > div.row > div > div.Account.manager-list-table-block.colored-th-table-block.custom-table-block.custom-table-block-2.first-col-fixed-block.last-col-fixed-block.nowrap-table-block.th-nowrap.sort-table-block.center-th-align.company-table > div.responsive-table.scroll-table-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(1) > a > label > span');
await page.locator('xpath=(//*[@class="material-icons-outlined text-blue-clr icon-fs-20"])[1]').click();
await page.locator('xpath=//*[@id="root"]/div/div/main/div/div[1]/aside[2]/div/div/div/div/form/div/div[1]/div/button/span[2]').click();
await page.click('body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-footer > button.modal-right-btn.modal-btn.btn.btn-secondary');




    
  
  });
    });

