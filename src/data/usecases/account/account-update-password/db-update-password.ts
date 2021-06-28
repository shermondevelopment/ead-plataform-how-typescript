import {
    UpdateAccountPassword,
    UpdatePasswordParams
} from '../../../../domain/usecases/account/update-password/update-password'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'
import { UpdatePasswordRepository } from '../../../protocols/db/account/update-password-repository'
import { Hash } from '../add-account/db-add-account-protocols'
import { HashCompare } from '../authentication/db-authentication-protocols'

export class DbUpdatePassword implements UpdateAccountPassword {
    constructor(
        private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
        private readonly updatePasswordRepository: UpdatePasswordRepository,
        private readonly hashCompare: HashCompare,
        private readonly hashGenerator: Hash
    ) {}

    async updatePassword(params: UpdatePasswordParams): Promise<boolean> {
        const account = await this.loadAccountByIdRepository.loadById(params.id)
        if (account) {
            const hashCompare = await this.hashCompare.compare(
                params.currentPassword,
                account.password
            )
            if (hashCompare) {
                const password = await this.hashGenerator.hash(params.password)
                await this.updatePasswordRepository.updatePassword({
                    id: params.id,
                    password
                })
                return true
            }
        }
        return null
    }
}
