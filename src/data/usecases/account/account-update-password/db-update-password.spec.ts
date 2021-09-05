import { UpdatePasswordParams } from '../../../../domain/usecases/account/update-password/update-password'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'
import { UpdatePasswordRepository } from '../../../protocols/db/account/update-password-repository'
import {
    AccountModel,
    Hash,
    HashCompare
} from '../authentication/db-authentication-protocols'
import { DbUpdatePassword } from './db-update-password'

interface SutTypes {
    sut: DbUpdatePassword
    loadAccountByIdRepository: LoadAccountByIdRepository
    updatePasswordStub: UpdatePasswordRepository
    hashCompareStub: HashCompare
    hashStub: Hash
}

const HashStub = () => {
    class HashStub implements Hash {
        async hash(password: string): Promise<string> {
            return new Promise((resolve) => resolve('hashed_password'))
        }
    }
    return new HashStub()
}

const makeHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compare(value: string, hash: string): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new HashCompareStub()
}

const makeFakeAccount = () => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
    class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
        async loadById(id: string): Promise<Partial<AccountModel>> {
            const account = makeFakeAccount()
            return new Promise((resolve) => resolve(account))
        }
    }
    return new LoadAccountByIdRepositoryStub()
}

const makeFakeRequest = () => ({
    id: 'any_id',
    password: 'valid_password',
    confirmPassword: 'any_password',
    currentPassword: 'old_password'
})

const makeUpdatePasswordRepository = (): UpdatePasswordRepository => {
    class UpdateAccountRepositoryStub implements UpdatePasswordRepository {
        async updatePassword(params: UpdatePasswordParams): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new UpdateAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
    const hashCompareStub = makeHashCompare()
    const updatePasswordStub = makeUpdatePasswordRepository()
    const loadAccountByIdRepository = makeLoadAccountByIdRepository()
    const hashStub = HashStub()
    const sut = new DbUpdatePassword(
        loadAccountByIdRepository,
        updatePasswordStub,
        hashCompareStub,
        hashStub
    )
    return {
        updatePasswordStub,
        sut,
        hashCompareStub,
        hashStub,
        loadAccountByIdRepository
    }
}

describe('DbUpdatePassword', () => {
    test('Should call loadAccountByIdRepository with correct values', async () => {
        const { loadAccountByIdRepository, sut } = makeSut()
        const loadAccountSpy = jest.spyOn(loadAccountByIdRepository, 'loadById')
        await sut.updatePassword(makeFakeRequest())
        expect(loadAccountSpy).toHaveBeenCalledWith(makeFakeRequest().id)
    })
    test('Should call hashCompare with correct values', async () => {
        const { sut, hashCompareStub } = makeSut()
        const hashCompareSpy = jest.spyOn(hashCompareStub, 'compare')
        await sut.updatePassword(makeFakeRequest())
        expect(hashCompareSpy).toHaveBeenCalledWith(
            'old_password',
            'hashed_password'
        )
    })
    test('Should throw if hashCompare throws', async () => {
        const { hashCompareStub, sut } = makeSut()
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.updatePassword(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return null if HashComparer returns false', async () => {
        const { hashCompareStub, sut } = makeSut()
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const accessToken = await sut.updatePassword(makeFakeRequest())
        expect(accessToken).toBeNull()
    })
    test('Should call Encrypter with correct password', async () => {
        const { sut, hashStub } = makeSut()
        const encryptSpy = jest.spyOn(hashStub, 'hash')
        await sut.updatePassword(makeFakeRequest())
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
    test('Should throw if Encrypter throws', async () => {
        const { sut, hashStub } = makeSut()
        jest.spyOn(hashStub, 'hash').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.updatePassword(makeFakeRequest())
        expect(promise).rejects.toBeTruthy()
    })
})
