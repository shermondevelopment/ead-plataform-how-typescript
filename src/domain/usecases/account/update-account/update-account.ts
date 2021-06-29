import { UpdateAccountModel } from '../../../models/account/update-account-model'

export interface UpdateAccount {
    updateAccount(
        id: string,
        paramsAccount: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>>
}
