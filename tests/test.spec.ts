import { test } from '../fixture/test-fixture';
import {BaseBrowser } from '../baseClass/BaseBrowser';
import { PageManager } from '../pageObject/pageManager';
import { testData } from '../data/data';
import { fakeTestData } from '../data/dataGenerators';

test.describe('Browser Tests', () => {
  let browser: BaseBrowser;

  test.beforeEach(async () => {
    browser = new BaseBrowser();
    await browser.startBrowser();
    
  });

  test.afterAll(async () => {
    await browser.closeBrowser();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png` });
    }
  });

});


    // test.beforeEach('login',async({page,logingPage})=>{
    //     const pm = new PageManager(page);
    //     await page.goto(process.env.baseUrl as string);
    //     await pm.homepage().enterUsername(testData.standard_user.userName);
    //     await pm.homepage().enterPassword(testData.standard_user.password);
    //     await pm.homepage().clickLoginCta();
    // })
    



  test.describe('Sauce Demo ' ,()=> {
    //override the default retires in config file
    //test.describe.configure({retries:1})
  test('User login @regression @smoke', async ({page})=> {
    const pm = new PageManager(page);
            await pm.items().item();
            await pm.items().totalNumberOfItems();
            await pm.items().clickShopingCartlink();
            await pm.sumarry().itemName();
            await pm.sumarry().clickOnCheckout();
  });

  test('sorting @regression @smoke',async({page})=>{
    const pm = new PageManager(page);
    await pm.items().clickOnSort();
    await pm.items().getHighestPrice();
    await pm.items().clickOnAddtoCart();

  })

  test.describe('Different user login behavor @regression',()=>{
    test('invalid credentials',async({page})=>{
      const pm = new PageManager(page);
      await page.goto(testData.url.baseUrl);
      await pm.homepage().enterUsername(fakeTestData.login.username);
      await pm.homepage().enterPassword(fakeTestData.login.password);
      await pm.homepage().clickLoginCta();
      await pm.homepage().errorMessageforinavlidcred();


    })

    test('locked_out_user @regression',async({page})=>{
      const pm = new PageManager(page);
      await page.goto(testData.url.baseUrl);
        await pm.homepage().enterUsername(testData.locked_out_user.userName);
        await pm.homepage().enterPassword(testData.locked_out_user.password);
        await pm.homepage().clickLoginCta();
        await pm.homepage().errorMessagepopUp();
    });

    test('problem_user @regression',async({page})=>{
      const pm = new PageManager(page);
      await page.goto(testData.url.baseUrl);
        await pm.homepage().enterUsername(testData.problem_user.userName);
        await pm.homepage().enterPassword(testData.problem_user.password);
        await pm.homepage().clickLoginCta();
        await pm.items().logIfAllImagesAreSame();
    })

    test('error_user @regression',async({page})=>{
      const pm = new PageManager(page);
      await page.goto(testData.url.baseUrl);
        await pm.homepage().enterUsername(testData.error_user.userName);
        await pm.homepage().enterPassword(testData.error_user.password);
        await pm.homepage().clickLoginCta();
        await pm.items().clickOnAddtoCart();
        await pm.items().clickToRemoveItem();
        await pm.items().logTextVisibility(testData.text.expectedText);
        await page.waitForTimeout(3000)
    })

    test.skip('performance_glitch_user',async({page})=>{
      const timeout = 2000;
      const pm = new PageManager(page);
      await page.goto(testData.url.baseUrl);
        await pm.homepage().enterUsername(testData.performance_glitch_user.userName);
        await pm.homepage().enterPassword(testData.performance_glitch_user.password);
        await pm.homepage().clickLoginCta();
        await test.step('Logging in', async () => {
          await Promise.race([
            new Promise((_, reject) => setTimeout(() => reject(new Error('Login took too long')), timeout))
          ]);
        });


    })
    
  
  })

  });