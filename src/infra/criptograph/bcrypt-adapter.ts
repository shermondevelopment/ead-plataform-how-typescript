import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
    constructor(private readonly salt: number) {}

    async encrypt(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt)
    }
}
