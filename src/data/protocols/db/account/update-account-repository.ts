import { UpdateAccountModel } from '../../../../domain/models/account/update-account-model'

export interface UpdateAccountRepository {
    updateAccount(
        id: string,
        paramsAccount: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>>
}
