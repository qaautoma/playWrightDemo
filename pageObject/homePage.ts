import {Locator, Page, expect} from "@playwright/test"
import { chownSync } from "fs";


export class HomePage {
    readonly page : Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginCta: Locator;
    readonly errorMessage:Locator;
    readonly errorMeassgaeforInavlidCred: Locator
   
    constructor(page:Page){
        this.page=page;
        this.userName=page.locator('#user-name');
        this.password= page.locator('#password');
        this.loginCta=page.locator('#login-button');
        this.errorMessage=page.getByText('Epic sadface: Sorry, this user has been locked out.')
        this.errorMeassgaeforInavlidCred=page.getByText('Epic sadface: Username and password do not match any user in this service')
    }



    async enterUsername(username:string){
        await this.userName.fill(username);
    }

    async enterPassword(passwrd:string ){
        await this.password.fill(passwrd);

    }

    async clickLoginCta(){
        await this.loginCta.click();
    }

    async errorMessagepopUp(){
        const message=await this.errorMessage.innerText();
        expect(message).toContain('Epic sadface: Sorry, this user has been locked out.')
        console.log(message)
    }

    async errorMessageforinavlidcred(){
        const error = await this.errorMeassgaeforInavlidCred.innerText();
        expect(error).toContain('Epic sadface: Username and password do not match any user in this service')
        console.log(error)

    }

}