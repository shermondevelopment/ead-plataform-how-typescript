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
        const account = await this.loadAccountByEmailRepository.loadByEmail(
            accountData.email
        )
        if (!account) {
            const hashedPassword = await this.hash.hash(accountData.password)
            const newAccount = await this.addAccount.add({
                ...accountData,
                password: hashedPassword
            })
            return newAccount
        }
        return null
    }
}
