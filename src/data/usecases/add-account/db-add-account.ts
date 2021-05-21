import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    AddAccountRepository,
    Hash
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    private readonly hash: Hash
    private readonly addAccount: AddAccountRepository

    constructor(hash: Hash, addAccount: AddAccountRepository) {
        this.hash = hash
        this.addAccount = addAccount
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hash.hash(accountData.password)
        const account = await this.addAccount.add({
            ...accountData,
            password: hashedPassword
        })
        return account
    }
}
