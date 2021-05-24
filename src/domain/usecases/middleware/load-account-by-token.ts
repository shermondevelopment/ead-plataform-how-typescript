import { AccountModel } from '../../models/account-model'

export interface LoadAccountByToken {
    load(AccessToken: string, role?: string): Promise<AccountModel>
}
