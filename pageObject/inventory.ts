import { Locator, Page, Selectors, expect } from "@playwright/test";


export class Products{
    readonly page: Page;
    readonly backpack: Locator;
    readonly numberOfItems : Locator;
    readonly shoppingCartLink : Locator;
    readonly itemPrice: Locator;
    readonly addToCart: Locator;
    readonly removeItem:Locator;
    constructor(page:Page){
        this.page=page;
        this.backpack=page.locator('#add-to-cart-sauce-labs-backpack');
        this.numberOfItems=page.locator('.shopping_cart_badge');
        this.shoppingCartLink=page.locator('.shopping_cart_link');
        this.itemPrice=page.getByText('49.99');
        this.addToCart=page.getByText('Add to cart');
        this.removeItem=page.getByText('Remove')

    }


    async item(){
        await this.backpack.click();
    }

    async totalNumberOfItems(){
        const Numberofitems =await this.numberOfItems.innerText();
        expect(Numberofitems).toBe('1');
    }

    async clickShopingCartlink(){
        await this.shoppingCartLink.click();
    }

    async clickOnSort(){
      const sorting =await this.page.$(".product_sort_container")
      await sorting?.selectOption("hilo");

    }
   
    async getHighestPrice(){
        const price=await this.itemPrice.innerText();
        expect(price).toContain('49.99')
    }

    async clickOnAddtoCart(){
       await this.addToCart.first().click();
    }


    async clickToRemoveItem(){
        await this.removeItem.click();
    }
    async isTextVisible(text: string): Promise<boolean> {
        const locator = this.removeItem
        return await locator.isVisible();
      }
    
      async logTextVisibility(text: string) {
        const isVisible = await this.isTextVisible(text);
        if (isVisible) {
          console.log(`The text "${text}" is visible.`);
        } else {
          console.log(`The text "${text}" is not visible.`);
        }
      }

    async getAllImageSources(): Promise<string[]> {
        return await this.page.$$eval('#inventory_container img', images => images.map(img => (img as HTMLImageElement).src));
      }
    
      async areAllImagesSame(): Promise<boolean> {
        const imageSources = await this.getAllImageSources();
        const uniqueSources = new Set(imageSources);
        return uniqueSources.size === 1;
      }
    
      async logIfAllImagesAreSame() {
        if (await this.areAllImagesSame()) {
          console.log('User is problematic: All images on the page are the same.');
        } else {
          console.log('Images on the page are not the same.');
        }
      }
}