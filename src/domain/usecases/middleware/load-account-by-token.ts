import { AccountModel } from '../../models/account/account-model'

export interface LoadAccountByToken {
    load(AccessToken: string, role?: string): Promise<AccountModel>
}
