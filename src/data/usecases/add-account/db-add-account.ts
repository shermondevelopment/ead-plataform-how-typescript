import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    AddAccountRepository,
    Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    private readonly encrypt: Encrypter
    private readonly addAccount: AddAccountRepository

    constructor(encrypt: Encrypter, addAccount: AddAccountRepository) {
        this.encrypt = encrypt
        this.addAccount = addAccount
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encrypt.encrypt(accountData.password)
        const account = await this.addAccount.add({
            ...accountData,
            password: hashedPassword
        })
        return account
    }
}
