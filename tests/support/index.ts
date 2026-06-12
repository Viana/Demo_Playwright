import {test as base, expect} from '@playwright/test'
import {Elements} from './components/Elements'
import {Register, Registro} from './actions/Register'
import {Login} from './actions/Login'
import {Api} from './components/Api'

type MyFixtures = {
    register: Register
    login: Login
    api: Api
}

export {Login, Register, Registro, Api}

export const context = base.extend<MyFixtures>({
    register: async ({page}, use) => {
        const elements = new Elements(page)
        const register = new Register(page, elements)
        await use(register)
    },
    api: async ({request}, use) => {
        const api = new Api(request)
        await use(api)
    },
    login: async ({page}, use) => {
        const elements = new Elements(page)
        const login = new Login(page, elements)
        await use(login)
    }

})