import { Hash } from '../../data/protocols/criptography/hashe'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hash {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt)
    }
}
