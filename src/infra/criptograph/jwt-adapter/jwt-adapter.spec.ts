import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return new Promise((resolve) => resolve('any_token'))
    },
    async verify(): Promise<string> {
        return new Promise((resolve) => resolve('any_value'))
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

const makeFakeData = () => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    status: false,
    admin: false,
    profile: 'any_profile',
    view_free_time: new Date()
})

describe('Jwt Adapter', () => {
    describe('SIGN()', () => {
        test('Should call sign with correct values', async () => {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            await sut.encrypt(makeFakeData())
            expect(signSpy).toHaveBeenCalledWith(
                { ...makeFakeData() },
                'secret'
            )
        })
        test('Should return a token on sign success', async () => {
            const sut = makeSut()
            const accessToken = await sut.encrypt(makeFakeData())
            expect(accessToken).toBe('any_token')
        })
        test('Should throw if sign throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.encrypt(makeFakeData())
            await expect(promise).rejects.toThrow()
        })
    })
    describe('verify', () => {
        test('Should call verify with correct values', async () => {
            const sut = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')
            await sut.decrypt('any_token')
            expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
        })
        test('Should return a value on verify success', async () => {
            const sut = makeSut()
            const value = await sut.decrypt('any_token')
            expect(value).toBe('any_value')
        })
        test('Should throw if verify throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.decrypt('any_token')
            await expect(promise).rejects.toThrow()
        })
    })
})
