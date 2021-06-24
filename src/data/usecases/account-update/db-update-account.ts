import { UpdateAccountModel } from '../../../domain/models/update-account-model'
import { UpdateAccount } from '../../../domain/usecases/update-account/update-account'
import { UpdateAccountRepository } from '../../protocols/db/account/update-account-repository'

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
