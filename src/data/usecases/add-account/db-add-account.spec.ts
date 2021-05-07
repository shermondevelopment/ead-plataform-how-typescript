import {
    AccountModel,
    AddAccountModel
} from '../../../presentation/controllers/signup-protocols'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
    encryptStub: Encrypter
    sut: DbAddAccount
    addAccountRepositoryStub: AddAccountRepository
}

const AddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(account: AddAccountModel): Promise<AccountModel> {
            return new Promise((resolved) =>
                resolved({
                    id: 'valid_id',
                    name: 'valid_name',
                    email: 'valid_email',
                    password: 'hashed_password'
                })
            )
        }
    }
    return new AddAccountRepositoryStub()
}

const EncryptStub = () => {
    class EncryptStub implements Encrypter {
        async encrypt(password: string): Promise<string> {
            return new Promise((resolve) => resolve('hash_password'))
        }
    }
    return new EncryptStub()
}

const makeSut = (): SutTypes => {
    const encryptStub = EncryptStub()
    const addAccountRepositoryStub = AddAccountRepository()
    const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)
    return {
        encryptStub,
        sut,
        addAccountRepositoryStub
    }
}

const accountFakeData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email',
    sexo: 'valid_sexo',
    password: 'valid_password'
})

const accountData = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
})

describe('DbAccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encryptStub } = makeSut()
        const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
        await sut.add(accountFakeData())
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
    test('Should throw if Encrypter throws', async () => {
        const { sut, encryptStub } = makeSut()
        jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(accountFakeData())
        expect(promise).rejects.toBeTruthy()
    })
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const spyAdd = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(accountFakeData())
        expect(spyAdd).toHaveBeenCalledWith(accountFakeData())
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
})
