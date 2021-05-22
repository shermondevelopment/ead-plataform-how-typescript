import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    AddAccountRepository,
    Hash
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hash: Hash,
        private readonly addAccount: AddAccountRepository
    ) {}

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hash.hash(accountData.password)
        const account = await this.addAccount.add({
            ...accountData,
            password: hashedPassword
        })
        return account
    }
}
