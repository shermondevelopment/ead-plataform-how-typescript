import { LoginController } from './login'
import {
    badRequest,
    serverError,
    unauthorized,
    ok
} from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'
import { HttpRequest, Authentication, Validation } from './login-protocols'

interface SutTypes {
    sut: LoginController
    validationStub: Validation
    authenticationStub: Authentication
}

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(email: string, password: string): Promise<string> {
            return new Promise((resolved) => resolved('any_token'))
        }
    }
    return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const authenticationStub = makeAuthentication()
    const sut = new LoginController(validationStub, authenticationStub)
    return {
        sut,
        validationStub,
        authenticationStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@mail.com',
        password: 'any_password'
    }
})

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

describe('Login Controller', () => {
    test('Should call Authenthicate with correct values', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(makeFakeRequest())
        expect(authSpy).toHaveBeenCalledWith(
            'any_email@mail.com',
            'any_password'
        )
    })
    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
            new Promise((resolved) => resolved(null))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })
    test('Should return 500 if authentication throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if valid credentials authentication', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ token: 'any_token' }))
    })
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('any_field')
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('any_field'))
        )
    })
})
