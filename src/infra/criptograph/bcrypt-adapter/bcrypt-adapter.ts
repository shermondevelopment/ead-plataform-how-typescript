import { Hash } from '../../../data/protocols/criptography/hashe'
import bcrypt from 'bcrypt'
import { HashCompare } from '../../../data/protocols/criptography/hash-compare'

export class BcryptAdapter implements Hash, HashCompare {
    constructor(private readonly salt: number) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt)
    }
    async compare(value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }
}
