import { LoginController } from './login'
import {
    badRequest,
    serverError,
    unauthorized
} from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../erros'
import { EmailValidator, HttpRequest, Authentication } from './login-protocols'

interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
    authenticationStub: Authentication
}

const makeEmailValidar = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isEmail(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
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
    const emailValidatorStub = makeEmailValidar()
    const authenticationStub = makeAuthentication()
    const sut = new LoginController(emailValidatorStub, authenticationStub)
    return {
        sut,
        emailValidatorStub,
        authenticationStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@mail.com',
        password: 'any_password'
    }
})

describe('Login Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })
    test('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('password'))
        )
    })
    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })
    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const spyIsEmail = jest.spyOn(emailValidatorStub, 'isEmail')
        await sut.handle(makeFakeRequest())
        expect(spyIsEmail).toHaveBeenCalledWith('any_email@mail.com')
    })
    test('Should return if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isEmail').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
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
})
