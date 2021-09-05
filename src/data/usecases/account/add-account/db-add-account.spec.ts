import {
    AccountModel,
    AddAccountModel,
    Hash,
    AddAccountRepository,
    LoadAccountByEmailRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
    hashStub: Hash
    sut: DbAddAccount
    addAccountRepositoryStub: AddAccountRepository
    loadAccountbyEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
        implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<AccountModel> {
            return new Promise((resolve) => resolve(null))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const accountFakeData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email',
    sexo: 'valid_sexo',
    password: 'valid_password'
})

const accountData = () => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password',
    view_free_time: new Date()
})

const AddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(account: AddAccountModel): Promise<AccountModel> {
            return new Promise((resolved) => resolved(accountData()))
        }
    }
    return new AddAccountRepositoryStub()
}

const HashStub = () => {
    class HashStub implements Hash {
        async hash(password: string): Promise<string> {
            return new Promise((resolve) => resolve('hashed_password'))
        }
    }
    return new HashStub()
}

const makeSut = (): SutTypes => {
    const hashStub = HashStub()
    const loadAccountbyEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const addAccountRepositoryStub = AddAccountRepository()
    const sut = new DbAddAccount(
        hashStub,
        addAccountRepositoryStub,
        loadAccountbyEmailRepositoryStub
    )
    return {
        hashStub,
        sut,
        addAccountRepositoryStub,
        loadAccountbyEmailRepositoryStub
    }
}

describe('DbAccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, hashStub } = makeSut()
        const encryptSpy = jest.spyOn(hashStub, 'hash')
        await sut.add(accountFakeData())
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
    test('Should throw if Encrypter throws', async () => {
        const { sut, hashStub } = makeSut()
        jest.spyOn(hashStub, 'hash').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(accountFakeData())
        expect(promise).rejects.toBeTruthy()
    })
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const spyAdd = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(accountFakeData())
        expect(spyAdd).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            sexo: 'valid_sexo',
            password: 'hashed_password'
        })
    })
    test('Should call if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(accountFakeData())
        await expect(promise).rejects.toThrow()
    })
    test('Should return an account if on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(accountFakeData())
        expect(account).toEqual(accountData())
    })
    test('Should return return null if LoadAcccountByEmailRepository not return null', async () => {
        const { sut, loadAccountbyEmailRepositoryStub } = makeSut()
        jest.spyOn(
            loadAccountbyEmailRepositoryStub,
            'loadByEmail'
        ).mockReturnValueOnce(new Promise((resolve) => resolve(accountData())))
        const account = await sut.add(accountFakeData())
        expect(account).toBeNull()
    })
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { loadAccountbyEmailRepositoryStub, sut } = makeSut()
        const loadSpy = jest.spyOn(
            loadAccountbyEmailRepositoryStub,
            'loadByEmail'
        )
        await sut.add(accountFakeData())
        expect(loadSpy).toHaveBeenCalledWith('valid_email')
    })
})
