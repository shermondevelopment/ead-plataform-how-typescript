import {
    EmailValidator,
    AddAccount,
    AddAccountModel,
    AccountModel
} from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../erros'
import { serverError } from '../helpers/http-helper'
import { HttpRequest } from '../protocols/http'
import { SignUpController } from './signup'

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
}

const makeEmailValidatorStub = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isEmail(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeAddAccountStub = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@mail.com'
            }
            return new Promise((resolve) => resolve(fakeAccount))
        }
    }
    return new AddAccountStub()
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccountStub()
    const emailValidatorStub = makeEmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub, addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        sexo: 'any_password',
        password: 'any_password'
    }
})

describe('SignUpController', () => {
    test('Should return 400 if no name is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                sexo: 'any_sexo',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                sexo: 'any_sexo',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if no sexo is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('sexo'))
    })
    test('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                sexo: 'any_sexo'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should return 400 if an email is invalid', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
    test('Should must call EmailValidator with a correct value', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const spyIsEmail = jest.spyOn(emailValidatorStub, 'isEmail')
        await sut.handle(makeFakeRequest())
        expect(spyIsEmail).toHaveBeenCalledWith('any_email@mail.com')
    })
    test('Should return 500 if an invalid addAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })
})
