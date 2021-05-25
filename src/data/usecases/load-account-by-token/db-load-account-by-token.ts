import {
    AccountModel,
    LoadAccountByToken
} from '../../../presentation/middlewares/auth-middleware-protocols'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async load(accessToken: string, role?: string): Promise<AccountModel> {
        const token = await this.decrypter.decrypt(accessToken)
        if (token) {
            await this.loadAccountByTokenRepository.loadByToken(
                accessToken,
                role
            )
        }
        return null
    }
}
