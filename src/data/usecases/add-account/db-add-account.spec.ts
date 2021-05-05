import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
    encryptStub: Encrypter
    sut: DbAddAccount
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
    const sut = new DbAddAccount(encryptStub)
    return {
        encryptStub,
        sut
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
})
