import { UpdateAccountModel } from '../../../../domain/models/account/update-account-model'
import { UpdateAccount } from '../../../../domain/usecases/account/update-account/update-account'
import { UpdateAccountRepository } from '../../../protocols/db/account/update-account-repository'

export class DbAccountUpdate implements UpdateAccount {
    constructor(
        private readonly updateAccountRepository: UpdateAccountRepository
    ) {}

    async updateAccount(
        id: string,
        params: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>> {
        const accountUpdate = await this.updateAccountRepository.updateAccount(
            id,
            params
        )
        return accountUpdate
    }
}
