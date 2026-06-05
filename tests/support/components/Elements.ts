import {test, expect, type Page} from '@playwright/test'

export class Elements {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async button(nameButton: string) {
        await this.page.getByRole("button", {name: nameButton}).click()
    }

    async link(nameLink: string) {
        await this.page.getByRole("link", {name: nameLink}).click()
    }

    async input(label: string, value: string) {
        const locator = this.page.locator(`//tr[td/b[contains(text(),"${label}")]]//input`)
        await locator.fill(value)
    }

    async inputButton(value: string) {
        const locator = this.page.locator(`//input[@type='submit' and @value="${value}"]`)
        await locator.click()
    }

    async spanError(label:string) {
        return await this.page.locator(`//tr[td/b[contains(text(),"${label}")]]//span[@class='error']`).textContent()
    }

    async titlePage(locator:string) {
        return await this.page.locator(locator).getByRole("heading").textContent()
    }
}
