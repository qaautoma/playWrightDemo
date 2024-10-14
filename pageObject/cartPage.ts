import { Locator, Page, expect } from "@playwright/test";

export class CartPage{
    readonly page : Page
    readonly itemname: Locator
    readonly checkouCta: Locator

    constructor(page:Page){
        this.page=page;
        this.itemname=page.getByText('Sauce Labs Backpack')
        this.checkouCta=page.getByText('Checkout')
    }

    async itemName(){
        await this.itemname.isVisible();
        const product=await this.itemname.innerText();
        expect(product).toBe('Sauce Labs Backpack')
    }
    async clickOnCheckout(){
        await this.checkouCta.isVisible()
        await this.checkouCta.click();
    }
}