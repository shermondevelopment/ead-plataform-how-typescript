import { AccountModel } from '../../../usecases/account/add-account/db-add-account-protocols'

export interface LoadAccountByTokenRepository {
    loadByToken(email: string, role?: string): Promise<AccountModel>
}
