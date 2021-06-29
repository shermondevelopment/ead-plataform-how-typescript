import { AccountModel } from '../../../models/account/account-model'

export interface AddAccountModel {
    name: string
    email: string
    sexo: string
    password: string
    token_account?: string
}

export interface AddAccount {
    add(account: AddAccountModel): Promise<AccountModel>
}
