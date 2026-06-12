import {expect} from '@playwright/test'
import {context as test, Registro} from '../support'

const data = require('../support/fixtures/users.json')
test.describe('Login do usuário', () => {
    // API de Limpeza de dados
    test.beforeAll(async ({api}) => {
        const response = await api.cleanData()
        expect(response.ok()).toBeTruthy()
    })
    test.beforeEach(async ({login}) => {
        await login.visit()
    })
    test('deve realizar login com sucesso', async ({login, api}) => {
        const user: Registro = data.validar_login
        const response = await api.registerUser(user)
        expect(response.ok()).toBeTruthy()

        await login.fillLogin(user.userName, user.password)
        await login.clickLoginButton()
        const msgSucesso = `Welcome ${user.firstName} ${user.lastName}`
        expect(await login.getMsgUserLogin()).toEqual(msgSucesso)
    })

    test('não deve logar com usuário que não foi cadastrado', async ({login}) => {
        await login.fillLogin("jose.luiz", "jose123")
        await login.clickLoginButton()
        const msgErro = `The username and password could not be verified.`
        expect(await login.getMsgErroUserLogin()).toEqual(msgErro)
    })

    test('não deve logar com campo username vazio', async ({login}) => {
        await login.fillLogin('', "jose123")
        await login.clickLoginButton()
        const msgErro = `Please enter a username and password.`
        expect(await login.getMsgErroUserLogin()).toEqual(msgErro)
    })

    test('não deve logar com campo password vazio', async ({login}) => {
        await login.fillLogin('jose.luis', '')
        await login.clickLoginButton()
        const msgErro = `Please enter a username and password.`
        expect(await login.getMsgErroUserLogin()).toEqual(msgErro)
    })
})