import { EnableAccount } from '../../../domain/usecases/active-account/active-account'
import {
    EnabledAccountRepository,
    TokenRepository
} from '../../protocols/db/account/enable-account-repository'

export class DbAccountEnable implements EnableAccount {
    constructor(
        private readonly enabledAccountRepository: EnabledAccountRepository
    ) {}

    async enabled(token: TokenRepository): Promise<boolean> {
        const result = await this.enabledAccountRepository.enabled(token)
        return result
    }
}
