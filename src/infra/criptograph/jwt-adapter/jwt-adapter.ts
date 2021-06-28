import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import {
    Encrypter,
    EncrypterParams
} from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) {}

    async encrypt(value: EncrypterParams): Promise<string> {
        const accessToken = await jwt.sign(
            { id: value.id, name: value.name, profile: value.profile },
            this.secret
        )
        return accessToken
    }
    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret)
        return value
    }
}
