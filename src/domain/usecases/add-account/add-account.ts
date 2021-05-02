import { AccountModel } from '../../models/account-model'

export interface AddAccountModel {
    name: string
    email: string
    sexo: string
    password: string
}

export interface AddAccount {
    add(account: AddAccountModel): Promise<AccountModel>
}
