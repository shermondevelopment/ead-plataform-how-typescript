import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../erros'
import { EmailValidator } from '../signup/signup-protocols'

interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
}

const makeEmailValidar = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isEmail(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidar()
    const sut = new LoginController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

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
    test('Should call EmailValidatorwith correct email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const spyIsEmail = jest.spyOn(emailValidatorStub, 'isEmail')
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(spyIsEmail).toHaveBeenCalledWith('any_email@mail.com')
    })
})
