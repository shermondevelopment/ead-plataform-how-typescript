import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise((resolved) => resolved('hash'))
    }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
    test('Should call bcrypt correct value', async () => {
        const sut = makeSut()
        const spyBcrypt = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(spyBcrypt).toHaveBeenCalledWith('any_value', salt)
    })
})
