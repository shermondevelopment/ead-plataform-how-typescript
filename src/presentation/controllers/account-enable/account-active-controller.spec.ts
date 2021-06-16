import { ActiveAccountController } from './account-active-controller'
import {
    EnableAccount,
    Token,
    badRequest,
    ok,
    serverError,
    InvalidParamError
} from './account-active-controller-protocols'

interface SutTypes {
    sut: ActiveAccountController
    enableAccount: EnableAccount
}

const fakeRequest = () => ({
    query: {
        token: 'any_token'
    }
})

const makeFakeActiveAccount = (): EnableAccount => {
    class ActiveAccountStub implements EnableAccount {
        async enabled(token: Token): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new ActiveAccountStub()
}

const makeSut = (): SutTypes => {
    const enableAccount = makeFakeActiveAccount()
    const sut = new ActiveAccountController(enableAccount)
    return {
        enableAccount,
        sut
    }
}

describe('Active Account', () => {
    test('Should call accountActive how correct values', async () => {
        const { sut, enableAccount } = makeSut()
        const spyActiveAccount = jest.spyOn(enableAccount, 'enabled')
        await sut.handle(fakeRequest())
        expect(spyActiveAccount).toHaveBeenCalledWith({ token: 'any_token' })
    })
    test('Should return false if ActiveAccount return false', async () => {
        const { sut, enableAccount } = makeSut()
        jest.spyOn(enableAccount, 'enabled').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const httpResponse = await sut.handle(fakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('token')))
    })
    test('Should return throw if ActiveAccount return throw', async () => {
        const { sut, enableAccount } = makeSut()
        jest.spyOn(enableAccount, 'enabled').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(fakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if ActiveAccount return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(fakeRequest())
        expect(httpResponse).toEqual(ok(true))
    })
})
