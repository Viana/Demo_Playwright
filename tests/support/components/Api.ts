import {APIRequestContext, expect} from '@playwright/test'
import {Registro} from '../actions/Register'

export class Api {
    request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async cleanData(){
        const response = await this.request.post('https://parabank.parasoft.com/parabank/db.htm', {
            params: {
                action: 'clean'
            }
        })
        return response
    }

    async registerUser(user: Registro) {
        // 1. GET para obter sessão válida
        const resp= await this.request.get('https://parabank.parasoft.com/parabank/register.htm')

        const response = await this.request.post('https://parabank.parasoft.com/parabank/register.htm', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'JSESSIONID': 'F15EE897F08DDBE3B0444FC787CED8ED'
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
                'repeatedPassword': user.confirm,
            },
        })
        return response
    }
}