import {
    AccountModel,
    AddAccount,
    AddAccountModel
} from '../../../presentation/controllers/signup-protocols'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
    private readonly encrypt: Encrypter
    private readonly addAccount: AddAccountRepository

    constructor(encrypt: Encrypter, addAccount: AddAccountRepository) {
        this.encrypt = encrypt
        this.addAccount = addAccount
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        this.encrypt.encrypt(accountData.password)
        const account = await this.addAccount.add(accountData)
        return account
    }
}
