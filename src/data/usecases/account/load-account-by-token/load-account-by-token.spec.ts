import { AccountModel } from '../../../../presentation/middlewares/auth-middleware-protocols'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByRepositoryStub: LoadAccountByTokenRepository
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
})

const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt(value: string): Promise<string> {
            return new Promise((resolve) => resolve('any_value'))
        }
    }
    return new DecrypterStub()
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenStub implements LoadAccountByTokenRepository {
        async loadByToken(token: string, role?: string): Promise<AccountModel> {
            return new Promise((resolve) => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenStub()
}

const makeSut = (): SutTypes => {
    const loadAccountByRepositoryStub = makeLoadAccountByTokenRepository()
    const decrypterStub = makeDecrypter()
    const sut = new DbLoadAccountByToken(
        decrypterStub,
        loadAccountByRepositoryStub
    )
    return {
        sut,
        decrypterStub,
        loadAccountByRepositoryStub
    }
}

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypt with correct value', async () => {
        const { sut, decrypterStub } = makeSut()
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })
    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
            new Promise((resolve) => resolve(null))
        )
        const account = await sut.load('any_token', 'any_rule')
        expect(account).toBeNull()
    })
    test('Should call LoadAccountByTokenRepository with correct value', async () => {
        const { sut, loadAccountByRepositoryStub } = makeSut()
        const loadByTokenSpy = jest.spyOn(
            loadAccountByRepositoryStub,
            'loadByToken'
        )
        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
    })
    test('Should return null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByRepositoryStub } = makeSut()
        jest.spyOn(
            loadAccountByRepositoryStub,
            'loadByToken'
        ).mockReturnValueOnce(new Promise((resolve) => resolve(null)))
        const account = await sut.load('any_token', 'any_rule')
        expect(account).toBeNull()
    })
    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.load('any_token', 'any_role')
        expect(account).toEqual(makeFakeAccount())
    })
    test('Should throw Decrypt throws', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrow()
    })
    test('Should throw if Decrypter throws', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrow()
    })
    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByRepositoryStub } = makeSut()
        jest.spyOn(
            loadAccountByRepositoryStub,
            'loadByToken'
        ).mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrow()
    })
})
