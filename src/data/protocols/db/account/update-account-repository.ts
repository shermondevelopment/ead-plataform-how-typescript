import { UpdateAccountModel } from '../../../../domain/models/update-account-model'

export interface UpdateAccountRepository {
    updateAccount(
        id: string,
        paramsAccount: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>>
}
