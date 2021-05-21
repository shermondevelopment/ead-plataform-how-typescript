import { DbAuthentication } from './db-authentication'
import {
    AuthenticationModel,
    HashCompare,
    Encrypter,
    LoadAccountByEmailRepository,
    AccountModel,
    UpdateAccessTokenRepository
} from './db-authentication-protocols'

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

const makeGenerator = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise((resolved) => resolved('any_token'))
        }
    }
    return new EncrypterStub()
}

const makeUpdateAccessTokenRepositoryGenerator = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
        implements UpdateAccessTokenRepository {
        async update(id: string, token: string): Promise<void> {
            return new Promise((resolved) => resolved())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})

interface SutTypes {
    sut: DbAuthentication
    loadAccountbyEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
    encrypterStub: Encrypter
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
    const loadAccountbyEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const hashCompareStub = makeHashCompare()
    const encrypterStub = makeGenerator()
    const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepositoryGenerator()
    const sut = new DbAuthentication(
        loadAccountbyEmailRepositoryStub,
        hashCompareStub,
        encrypterStub,
        updateAccessTokenRepositoryStub
    )
    return {
        sut,
        loadAccountbyEmailRepositoryStub,
        hashCompareStub,
        encrypterStub,
        updateAccessTokenRepositoryStub
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
    test('Should call Encrypter with correct id', async () => {
        const { encrypterStub, sut } = makeSut()
        const generateSpy = jest
            .spyOn(encrypterStub, 'encrypt')
            .mockReturnValueOnce(null)
        await sut.auth(makeFakeAuthentication())
        expect(generateSpy).toHaveBeenCalledWith('any_id')
    })
    test('Should throw if Encrypter throws', async () => {
        const { encrypterStub, sut } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })
    test('Should return a token on success', async () => {
        const { sut } = makeSut()
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toEqual('any_token')
    })
    test('Should call updareAccessTokenRepository with correct values', async () => {
        const { updateAccessTokenRepositoryStub, sut } = makeSut()
        const updateSpy = jest
            .spyOn(updateAccessTokenRepositoryStub, 'update')
            .mockReturnValueOnce(null)
        await sut.auth(makeFakeAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    })
    test('Should throw if updareAccessTokenRepository throws', async () => {
        const { updateAccessTokenRepositoryStub, sut } = makeSut()
        jest.spyOn(
            updateAccessTokenRepositoryStub,
            'update'
        ).mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })
})
