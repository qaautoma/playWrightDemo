import{test as base} from "@playwright/test"
import { PageManager } from '../pageObject/pageManager';
import { testData } from '../data/data';


export type testOptions={
    logingPage: string
}

export const test = base.extend<testOptions>({
     logingPage: [async({page}, use)=>{
        const pm = new PageManager(page);
        await page.goto('https://www.saucedemo.com/');
        await pm.homepage().enterUsername(testData.standard_user.userName);
        await pm.homepage().enterPassword(testData.standard_user.password);
        await pm.homepage().clickLoginCta();
        await use('')
     },{auto:true}]
})