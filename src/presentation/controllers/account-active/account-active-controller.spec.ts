import { ActiveAccountController } from './account-active-controller'
import {
    ActiveAccount,
    Token
} from '../../../domain/usecases/active-account/active-account'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { InvalidParamError } from '../../erros'

interface SutTypes {
    sut: ActiveAccountController
    activeAccount: ActiveAccount
}

const fakeRequest = () => ({
    query: {
        token: 'any_token'
    }
})

const makeFakeActiveAccount = (): ActiveAccount => {
    class ActiveAccountStub implements ActiveAccount {
        async accountActive(token: Token): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new ActiveAccountStub()
}

const makeSut = (): SutTypes => {
    const activeAccount = makeFakeActiveAccount()
    const sut = new ActiveAccountController(activeAccount)
    return {
        activeAccount,
        sut
    }
}

describe('Active Account', () => {
    test('Should call accountActive how correct values', async () => {
        const { sut, activeAccount } = makeSut()
        const spyActiveAccount = jest.spyOn(activeAccount, 'accountActive')
        await sut.handle(fakeRequest())
        expect(spyActiveAccount).toHaveBeenCalledWith({ token: 'any_token' })
    })
    test('Should return false if ActiveAccount return false', async () => {
        const { sut, activeAccount } = makeSut()
        jest.spyOn(activeAccount, 'accountActive').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const httpResponse = await sut.handle(fakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('token')))
    })
    test('Should return throw if ActiveAccount return throw', async () => {
        const { sut, activeAccount } = makeSut()
        jest.spyOn(activeAccount, 'accountActive').mockReturnValueOnce(
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
