import {expect, test} from '@playwright/test'
import {Register, Registro} from "../support/actions/Register"
import {Elements} from "../support/components/Elements";

const data = require('../support/fixtures/users.json')

test.describe('Registro de usuário', () => {
    let register: Register

    // API de Limpeza de dados
    test.beforeAll(async ({request}) => {
        const resp = await request.post('https://parabank.parasoft.com/parabank/db.htm', {
            params: {
                action: 'clean'
            }
        })
        expect(resp.ok()).toBeTruthy()
    })

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

    test('deve validar usuário já cadastrado', async ({page, request}) => {
        const user: Registro = data.valida_user_cadastrado

        // Cadastrando user via API pra depois ser cadastrado o mesmo pela tela
        const response = await request.post('https://parabank.parasoft.com/parabank/register.htm', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=275612449FA9D3633B0F3B1F7E7D17CE',
            },
            form: {
                'customer.firstName': user.firstName,
                'customer.lastName': user.lastName,
                'customer.address.street': user.address,
                'customer.address.city': user.city,
                'customer.address.state': user.state,
                'customer.address.zipCode': user.zipCode,
                'customer.phoneNumber': user.phone,
                'customer.ssn': user.ssn,
                'customer.username': user.userName,
                'customer.password': user.password,
                'repeatedPassword': user.confirm
            },
        });

        expect(response.ok()).toBeTruthy()

        // const user: Registro = data.create
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
