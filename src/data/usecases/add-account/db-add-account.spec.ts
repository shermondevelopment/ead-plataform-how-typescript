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
                    email: 'valid_email'
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

describe('DbAccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encryptStub } = makeSut()
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            sexo: 'valid_sexo',
            password: 'valid_password'
        }
        const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
    test('Should throw if Encrypter throws', async () => {
        const { sut, encryptStub } = makeSut()
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            sexo: 'valid_sexo',
            password: 'valid_password'
        }
        jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(accountData)
        expect(promise).rejects.toBeTruthy()
    })
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const spyAdd = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountFake = {
            name: 'valid_name',
            email: 'valid_email',
            sexo: 'valid_sexo',
            password: 'valid_password'
        }
        await sut.add(accountFake)
        expect(spyAdd).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            sexo: 'valid_sexo',
            password: 'valid_password'
        })
    })
})
