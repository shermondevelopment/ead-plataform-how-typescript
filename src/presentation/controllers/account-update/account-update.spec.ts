import {
    UpdateAccount,
    UpdateAccountModel,
    ok,
    serverError
} from './account-update-protocols'
import { UpdateAccountController } from './account-update'

interface SutTypes {
    sut: UpdateAccountController
    updateAccountStub: UpdateAccount
}

const makeDbUpdateAccount = (): UpdateAccount => {
    class DbUpdateAccountStub implements UpdateAccount {
        async update(id: string, params: UpdateAccountModel): Promise<string> {
            return new Promise((resolved) => resolved('sucess'))
        }
    }
    return new DbUpdateAccountStub()
}

const makeSut = (): SutTypes => {
    const updateAccountStub = makeDbUpdateAccount()
    const sut = new UpdateAccountController(updateAccountStub)
    return {
        sut,
        updateAccountStub
    }
}

const makeFakeRequest = () => ({
    body: {
        name: 'new_name',
        zipcode: 123214,
        address: 'new_address'
    },
    accountId: 'any_id'
})

describe('AccountUpdate', () => {
    test('Should call updateAccount how correct values', async () => {
        const { sut, updateAccountStub } = makeSut()
        const spypdateAccount = jest.spyOn(updateAccountStub, 'update')
        await sut.handle(makeFakeRequest())
        expect(spypdateAccount).toHaveBeenCalledWith(
            makeFakeRequest().accountId,
            makeFakeRequest().body
        )
    })
    test('Should return 500 if an invalid updateAccouunt throws', async () => {
        const { sut, updateAccountStub } = makeSut()
        jest.spyOn(updateAccountStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if authentication success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ success: 'updated successfully' }))
    })
})
