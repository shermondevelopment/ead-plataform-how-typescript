export interface Token {
    token: string
}

export interface EnableAccount {
    enabled(token: Token): Promise<boolean>
}
