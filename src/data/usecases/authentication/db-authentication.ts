import {
    AuthenticationModel,
    HashCompare,
    Encrypter,
    LoadAccountByEmailRepository,
    Authentication,
    UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashCompare: HashCompare
    private readonly tokenGenerator: Encrypter
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

    constructor(
        loadAccountByEmailRepository: LoadAccountByEmailRepository,
        hashCompare: HashCompare,
        tokenGenerator: Encrypter,
        updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashCompare = hashCompare
        this.tokenGenerator = tokenGenerator
        this.updateAccessTokenRepository = updateAccessTokenRepository
    }

    async auth(authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(
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
