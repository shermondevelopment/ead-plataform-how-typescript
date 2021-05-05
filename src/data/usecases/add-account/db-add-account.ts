import {
    AccountModel,
    AddAccount,
    AddAccountModel
} from '../../../presentation/controllers/signup-protocols'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
    private readonly encrypt: Encrypter

    constructor(encrypt: Encrypter) {
        this.encrypt = encrypt
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        this.encrypt.encrypt(account.password)
        return new Promise((result) =>
            result({ id: 'any_id', name: 'any_name', email: 'any_email' })
        )
    }
}
