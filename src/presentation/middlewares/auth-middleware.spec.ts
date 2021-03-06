import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../erros'
import { AuthMiddleware } from './auth-middleware'
import {
    LoadAccountByToken,
    HttpRequest,
    AccountModel
} from './auth-middleware-protocols'

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password',
    view_free_time: new Date()
})

const makeFakeRequest = (): HttpRequest => ({
    headers: {
        'x-access-token': 'any_token'
    }
})

interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}

const makeLoadAccount = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load(accessToken: string, role?: string): Promise<AccountModel> {
            return new Promise((resolved) => resolved(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenStub()
}

const makeSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = makeLoadAccount()
    const sut = new AuthMiddleware(loadAccountByTokenStub, role)
    return {
        loadAccountByTokenStub,
        sut
    }
}

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
    test('Should call LoadAccountByToken with correct accessToken', async () => {
        const role = 'any_role'
        const { loadAccountByTokenStub, sut } = makeSut(role)
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_token', role)
    })
    test('Should return 403 if LoadAccountByToken return null', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(
            new Promise((resolved) => resolved(null))
        )
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
    })
    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
