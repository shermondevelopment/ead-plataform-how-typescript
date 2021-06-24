import { UpdateAccountModel } from '../../../domain/models/update-account-model'
import { UpdateAccountRepository } from '../../protocols/db/account/update-account-repository'
import { DbAccountUpdate } from './db-update-account'

interface SutTypes {
    sut: DbAccountUpdate
    updateAccountRepositoryStub: UpdateAccountRepository
}

const makeFakeUpdate = () => ({
    name: 'new_name',
    address: 'new_address',
    city: 'new_city'
})

const makeUpdateAccountRepository = (): UpdateAccountRepository => {
    class UpdateAccountRepositoryStub implements UpdateAccountRepository {
        async updateAccount(
            id: string,
            params: UpdateAccountModel
        ): Promise<Partial<UpdateAccountModel>> {
            return new Promise((resolved) => resolved(makeFakeUpdate()))
        }
    }
    return new UpdateAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
    const updateAccountRepositoryStub = makeUpdateAccountRepository()
    const sut = new DbAccountUpdate(updateAccountRepositoryStub)
    return {
        sut,
        updateAccountRepositoryStub
    }
}

describe('DbAccountUpdate', () => {
    test('Shoud call updateAccountRepository how correct values', async () => {
        const { sut, updateAccountRepositoryStub } = makeSut()
        const spyUpdateAccount = jest.spyOn(
            updateAccountRepositoryStub,
            'updateAccount'
        )
        await sut.updateAccount('any_id', makeFakeUpdate())
        expect(spyUpdateAccount).toHaveBeenCalledWith(
            'any_id',
            makeFakeUpdate()
        )
    })
    test('Should throws UpdateAccountRepository return throws', async () => {
        const { sut, updateAccountRepositoryStub } = makeSut()
        jest.spyOn(
            updateAccountRepositoryStub,
            'updateAccount'
        ).mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.updateAccount('any_id', makeFakeUpdate())
        await expect(promise).rejects.toThrow()
    })
    test('Should UpdateAccountRepository return value how success', async () => {
        const { sut } = makeSut()
        const updateAccount = await sut.updateAccount(
            'any_id',
            makeFakeUpdate()
        )
        expect(updateAccount).toEqual(makeFakeUpdate())
    })
})
