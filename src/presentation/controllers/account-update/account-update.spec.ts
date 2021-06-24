import {
    UpdateAccount,
    UpdateAccountModel,
    ok,
    serverError
} from './account-update-protocols'
import { UpdateAccountController } from './account-update'
import { Validation } from '../signup/signup-controller-protocols'

interface SutTypes {
    sut: UpdateAccountController
    updateAccountStub: UpdateAccount
}

const makeFakeRequest = () => ({
    body: {
        name: 'new_name',
        zipcode: '934274623',
        address: 'new_address'
    },
    accountId: 'any_id'
})

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeDbUpdateAccount = (): UpdateAccount => {
    class DbUpdateAccountStub implements UpdateAccount {
        async updateAccount(
            id: string,
            params: UpdateAccountModel
        ): Promise<Partial<UpdateAccountModel>> {
            return new Promise((resolved) =>
                resolved({
                    name: 'new_name',
                    zipcode: '934274623',
                    address: 'new_address'
                })
            )
        }
    }
    return new DbUpdateAccountStub()
}

const makeSut = (): SutTypes => {
    const validation = makeValidation()
    const updateAccountStub = makeDbUpdateAccount()
    const sut = new UpdateAccountController(updateAccountStub, validation)
    return {
        sut,
        updateAccountStub
    }
}

describe('AccountUpdate', () => {
    test('Should call updateAccount how correct values', async () => {
        const { sut, updateAccountStub } = makeSut()
        const spypdateAccount = jest.spyOn(updateAccountStub, 'updateAccount')
        await sut.handle(makeFakeRequest())
        expect(spypdateAccount).toHaveBeenCalledWith(
            makeFakeRequest().accountId,
            makeFakeRequest().body
        )
    })
    test('Should return 500 if an invalid updateAccouunt throws', async () => {
        const { sut, updateAccountStub } = makeSut()
        jest.spyOn(updateAccountStub, 'updateAccount').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if authentication success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeRequest().body))
    })
})
