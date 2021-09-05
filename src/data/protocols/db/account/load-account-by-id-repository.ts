import { AccountModel } from '../../../usecases/account/add-account/db-add-account-protocols'

export interface LoadAccountByIdRepository {
    loadById(id: string): Promise<Partial<AccountModel>>
}
