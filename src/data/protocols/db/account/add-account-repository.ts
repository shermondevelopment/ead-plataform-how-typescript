import { AddAccountModel } from '../../../../domain/usecases/add-account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'

export interface AddAccountRepository {
    add(account: AddAccountModel): Promise<AccountModel>
}
