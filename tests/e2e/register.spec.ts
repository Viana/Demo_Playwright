import {expect, test} from '@playwright/test'
import {Register, Registro} from "../support/actions/Register"
import {Elements} from "../support/components/Elements";

const data = require('../support/fixtures/users.json')

test.describe('Registro de usuário', () => {
    let register: Register

    test.beforeEach(async ({page}) => {
        const elements = new Elements(page)
        register = new Register(page, elements)
        await register.visit()
    })

    test('deve registrar usuário com sucesso', async ({page}) => {
        const user: Registro = data.create
        await register.fillRegister(user)
        await register.clickRegister()
        const msgSucesso = `Welcome ${user.userName}`
        expect(await register.getTitleLocator()).toEqual(msgSucesso)
    })

    test('deve validar usuário já cadastrado', async ({page}) => {
        const user: Registro = data.create
        await register.fillRegister(user)
        await register.clickRegister()
        const msgErr = await register.getSpanError("Username:")
        expect(msgErr).toBeTruthy()
        expect(msgErr).toEqual("This username already exists.")
    })

    test('deve validar os campos obrigatórios', async ({page}) => {
        await register.clickRegister()
        const labels: string[] = [
            "First Name:", "Last Name:", "Address:", "City:", "State:",
            "Zip Code:", "SSN:", "Username:", "Password:", "Confirm:"
        ];

        for (const label of labels) {
            let msg = await register.getSpanError(label);
            expect(msg).toContain("is required.")
        }
    })

    const labels: string[] = [
        "First Name", "Last Name", "Address", "City", "State",
        "Zip Code", "SSN", "Username", "Password", "Confirm"
    ];

    labels.forEach((label, index) => {
        test(`deve validar o campo obrigatório: ${label}`, async ({page}) => {
            // ✅ acesso dinâmico de propriedade
            const user: Registro = data[`valida_campo_required_${index}`]
            await register.fillRegister(user)
            await register.clickRegister()
            const msg = await register.getSpanError(label);
            switch (label) {
                case "SSN":
                    expect(msg.toLocaleLowerCase()).toEqual("Social Security Number is required.".toLocaleLowerCase())
                    break
                case "Confirm":
                    expect(msg.toLocaleLowerCase()).toEqual("Password confirmation is required.".toLocaleLowerCase())
                    break
                default:
                    if (msg.split(" ").length > 1) {
                        expect(msg.toLocaleLowerCase()).toEqual(`${label} is required.`.toLocaleLowerCase())
                    } else {
                        expect(msg).toEqual(`${label} is required.`)
                    }
            }
        })
    })

    test('deve validar campo passwords tem o mesmo valor', async ({page}) => {
        const user: Registro = data.valida_campo_password
        await register.fillRegister(user)
        await register.clickRegister()
        const msgErr = await register.getSpanError("Confirm:")
        expect(msgErr).toBeTruthy()
        expect(msgErr).toEqual("Passwords did not match.")
    })

})
