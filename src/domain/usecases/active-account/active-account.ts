export interface Token {
    token: string
}

export interface ActiveAccount {
    accountActive(token: Token): Promise<boolean>
}
