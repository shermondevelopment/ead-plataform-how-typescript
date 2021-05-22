import {
    AuthenticationModel,
    HashCompare,
    Encrypter,
    LoadAccountByEmailRepository,
    Authentication,
    UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashCompare: HashCompare,
        private readonly tokenGenerator: Encrypter,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {}

    async auth(authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(
            authentication.email
        )
        if (account) {
            const accountPassword = await this.hashCompare.compare(
                authentication.password,
                account.password
            )
            if (accountPassword) {
                const accessToken = await this.tokenGenerator.encrypt(
                    account.id
                )
                await this.updateAccessTokenRepository.update(
                    account.id,
                    accessToken
                )
                return accessToken
            }
        }

        return null
    }
}
