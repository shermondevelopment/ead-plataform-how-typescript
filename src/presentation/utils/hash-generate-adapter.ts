import { HashRandomGenerate } from '../protocols/hash-generate'
import crypt from 'crypto'

export class HashGenerateAdapter implements HashRandomGenerate {
    generateHash(): string {
        return crypt.randomBytes(16).toString('hex')
    }
}
