import {
    AccountModel,
    AddAccount,
    AddAccountModel,
    AddAccountRepository,
    Hash,
    LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hash: Hash,
        private readonly addAccount: AddAccountRepository,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        const hashedPassword = await this.hash.hash(accountData.password)
        const account = await this.addAccount.add({
            ...accountData,
            password: hashedPassword
        })
        return account
    }
}
