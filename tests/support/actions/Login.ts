import {expect, type Page} from '@playwright/test'
import {Elements} from "../components/Elements";

export class Login {
    page: Page
    elements: Elements

    constructor(page: Page, elements: Elements) {
        this.page = page
        this.elements = elements
    }

    async visit() {
        await this.page.goto('/parabank/index.htm');
        const titleLocator = await this.getTitleLocator()
        expect(titleLocator).toEqual("Customer Login");
    }

    async getTitleLocator() {
        // Chama o método da classe Elements
        return this.elements.titlePage("//div[@id='leftPanel']")
    }

    async fillLogin(user: string, pass: string) {
        await this.page.locator("//input[@name='username']").fill(user)
        await this.page.locator("//input[@name='password']").fill(pass)
    }

    async clickLoginButton(){
        await this.elements.inputButton("Log In")
    }

    async getMsgUserLogin(){
        return await this.page.locator("//div[@id='leftPanel']/p").textContent()
    }

    async getMsgErroUserLogin(){
        return await this.page.locator("//div[@id='rightPanel']/p").textContent()
    }
}