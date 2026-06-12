import {expect, type Page} from '@playwright/test'
import {Elements} from "../components/Elements";

export class Register {
    page: Page
    elements: Elements

    constructor(page: Page, elements: Elements) {
        this.page = page
        this.elements = elements
    }


    async visit() {
        await this.page.goto('/parabank/index.html');
        await Promise.all([
            this.page.waitForURL('parabank/register.**'),
            this.elements.link('Register')
        ])
        const titleLocator = await this.getTitleLocator()
        expect(titleLocator).toEqual("Signing up is easy!");
    }

    async getTitleLocator() {
        // Chama o método da classe Elements
        return this.elements.titlePage("//div[@id='rightPanel']")
    }

    async fillRegister(registro: Registro) {
        await this.elements.input("First Name", registro.firstName)
        await this.elements.input("Last Name", registro.lastName)
        await this.elements.input("Address", registro.address)
        await this.elements.input("City", registro.city)
        await this.elements.input("State", registro.state)
        await this.elements.input("Zip Code", registro.zipCode)
        await this.elements.input("Phone #", registro.phone)
        await this.elements.input("SSN", registro.ssn)
        await this.elements.input("Username", registro.userName)
        await this.elements.input("Password", registro.password)
        await this.elements.input("Confirm", registro.confirm)
    }


    async clickRegister(){
        await this.elements.inputButton("Register")
    }

    async getSpanError(label: string) {
        return await this.elements.spanError(label)
    }
}

export interface Registro {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    ssn: string,
    userName: string,
    password: string,
    confirm: string
}