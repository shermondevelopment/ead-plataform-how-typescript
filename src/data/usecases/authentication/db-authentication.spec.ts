import { AuthenticationModel } from '../../../domain/usecases/authentication/authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
        implements LoadAccountByEmailRepository {
        async load(email: string): Promise<AccountModel> {
            const account = makeFakeAccount()
            return new Promise((resolve) => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compare(value: string, hash: string): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new HashCompareStub()
}

const makeGenerator = (): TokenGenerator => {
    class TokenGeneratorStub implements TokenGenerator {
        async generate(id: string): Promise<string> {
            return new Promise((resolved) => resolved('any_token'))
        }
    }
    return new TokenGeneratorStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})

interface SutTypes {
    sut: DbAuthentication
    loadAccountbyEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
    tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
    const loadAccountbyEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const hashCompareStub = makeHashCompare()
    const tokenGeneratorStub = makeGenerator()
    const sut = new DbAuthentication(
        loadAccountbyEmailRepositoryStub,
        hashCompareStub,
        tokenGeneratorStub
    )
    return {
        sut,
        loadAccountbyEmailRepositoryStub,
        hashCompareStub,
        tokenGeneratorStub
    }
}

describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { loadAccountbyEmailRepositoryStub, sut } = makeSut()
        const loadSpy = jest.spyOn(loadAccountbyEmailRepositoryStub, 'load')
        await sut.auth(makeFakeAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    })
    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { loadAccountbyEmailRepositoryStub, sut } = makeSut()
        jest.spyOn(
            loadAccountbyEmailRepositoryStub,
            'load'
        ).mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })
    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { loadAccountbyEmailRepositoryStub, sut } = makeSut()
        jest.spyOn(
            loadAccountbyEmailRepositoryStub,
            'load'
        ).mockReturnValueOnce(null)
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toBeNull()
    })
    test('Should call hashCompare with correct values', async () => {
        const { hashCompareStub, sut } = makeSut()
        const compareSpy = jest
            .spyOn(hashCompareStub, 'compare')
            .mockReturnValueOnce(null)
        await sut.auth(makeFakeAuthentication())
        expect(compareSpy).toHaveBeenCalledWith(
            'any_password',
            'hashed_password'
        )
    })
    test('Should throw if hashCompare throws', async () => {
        const { hashCompareStub, sut } = makeSut()
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })
    test('Should return null if HashComparer returns false', async () => {
        const { hashCompareStub, sut } = makeSut()
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toBeNull()
    })
    test('Should call TokenGenerator with correct id', async () => {
        const { tokenGeneratorStub, sut } = makeSut()
        const generateSpy = jest
            .spyOn(tokenGeneratorStub, 'generate')
            .mockReturnValueOnce(null)
        await sut.auth(makeFakeAuthentication())
        expect(generateSpy).toHaveBeenCalledWith('any_id')
    })
    test('Should throw if TokenGenerator throws', async () => {
        const { tokenGeneratorStub, sut } = makeSut()
        jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })
})
