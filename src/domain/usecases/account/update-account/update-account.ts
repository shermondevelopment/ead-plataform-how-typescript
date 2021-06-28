import { UpdateAccountModel } from '../../../models/update-account-model'

export interface UpdateAccount {
    updateAccount(
        id: string,
        paramsAccount: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>>
}
