import { Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { Products } from "./inventory";
import { CartPage } from "./cartPage";
export class PageManager{
    private readonly page:Page 
    private readonly homePage :HomePage;
    private readonly products: Products;
    private readonly cartpage: CartPage;

constructor(page:Page){
this.page=page
this.homePage= new HomePage(this.page)
this.products= new Products(this.page)
this.cartpage= new CartPage(this.page)
}

homepage(){
    return this.homePage
}

items(){
    return this.products
}
sumarry(){
    return this.cartpage
}
}