import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise((resolved) => resolved('hash'))
    },
    async compare(): Promise<boolean> {
        return new Promise((resolved) => resolved(true))
    }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
    test('Should call hash correct value', async () => {
        const sut = makeSut()
        const spyBcrypt = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(spyBcrypt).toHaveBeenCalledWith('any_value', salt)
    })
    test('Should bcrypt return correct value', async () => {
        const sut = makeSut()
        const hashValue = await sut.hash('any_value')
        expect(hashValue).toBe('hash')
    })
    test('Should bcrypt return throws error', async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.hash('any_value')
        await expect(promise).rejects.toThrow()
    })
    test('Should call compare correct value', async () => {
        const sut = makeSut()
        const compareBcrypt = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_value', 'any_hash')
        expect(compareBcrypt).toHaveBeenCalledWith('any_value', 'any_hash')
    })
    test('Should return true when compare succeds', async () => {
        const sut = makeSut()
        const isValid = await sut.compare('any_value', 'hash_value')
        expect(isValid).toBe(true)
    })
})
