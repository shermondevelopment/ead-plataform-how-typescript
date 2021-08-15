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
                const accessToken = await this.tokenGenerator.encrypt({
                    id: account.id,
                    name: account.name,
                    email: account.email,
                    profile: account.profile,
                    status: account.status,
                    admin: account.role === 'admin' ? true : false,
                    payment: account.payment,
                    sexo: account.sexo,
                    zipcode: account.zipcode,
                    state: account.state,
                    city: account.city,
                    district: account.district,
                    address: account.address,
                    number: account.number,
                    phone: account.phone,
                    view_free_time: account.view_free_time
                })

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
