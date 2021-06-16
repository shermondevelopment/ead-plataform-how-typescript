export interface TokenRepository {
    token: string
}

export interface EnabledAccountRepository {
    enabled(token: TokenRepository): Promise<boolean>
}
