export interface EncrypterParams {
    id: string
    name: string
    profile: string
}

export interface Encrypter {
    encrypt(value: EncrypterParams): Promise<string>
}
