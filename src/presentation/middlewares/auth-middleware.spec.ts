import { HttpRequest } from '../protocols'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../erros'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken } from '../../domain/usecases/middleware/load-account-by-token'
import { AccountModel } from '../controllers/signup/signup-controller-protocols'

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
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

const makeSut = (): SutTypes => {
    const loadAccountByTokenStub = makeLoadAccount()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
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
        const { loadAccountByTokenStub, sut } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_token')
    })
    test('Should return 403 if LoadAccountByToken return null', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})
