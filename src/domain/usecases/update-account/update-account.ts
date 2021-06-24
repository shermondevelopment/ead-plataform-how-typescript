import { UpdateAccountModel } from '../../models/update-account-model'

export interface UpdateAccount {
    update(id: string, paramsAccount: UpdateAccountModel): Promise<string>
}
