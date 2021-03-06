import {
    AddAccount,
    AddAccountModel,
    AccountModel,
    Validation,
    Authentication,
    AuthenticationModel,
    SendEmail,
    EmailSendParams
} from './signup-controller-protocols'
import {
    MissingParamError,
    InternalServerError,
    EmailInUseError
} from '../../../erros'
import {
    serverError,
    ok,
    badRequest,
    forbidden
} from '../../../helpers/http/http-helper'
import { HttpRequest } from '../../../protocols/http'
import { SignUpController } from './signup-controller'
import { HashRandomGenerate } from '../../../protocols'

interface SutTypes {
    sut: SignUpController
    addAccountStub: AddAccount
    validationStub: Validation
    authenticationStub: Authentication
    sendEmail: SendEmail
}

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationModel): Promise<string> {
            return new Promise((resolved) => resolved('any_token'))
        }
    }
    return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        sexo: 'any_password',
        password: 'any_password'
    }
})

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    view_free_time: new Date()
})

const makeAddAccountStub = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel> {
            return new Promise((resolve) => resolve(makeFakeAccount()))
        }
    }
    return new AddAccountStub()
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSendEmail = (): SendEmail => {
    class EmailSendStub implements SendEmail {
        async sendEmail(paramsEmail: EmailSendParams): Promise<void> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new EmailSendStub()
}

const makeRandomGenerateHash = (): HashRandomGenerate => {
    class HashGenerateAdapterStub implements HashRandomGenerate {
        generateHash(): string {
            return 'any_hash'
        }
    }
    return new HashGenerateAdapterStub()
}

const makeSut = (): SutTypes => {
    const authenticationStub = makeAuthentication()
    const addAccountStub = makeAddAccountStub()
    const validationStub = makeValidation()
    const sendEmail = makeSendEmail()
    const hashRandomGenerate = makeRandomGenerateHash()
    const sut = new SignUpController(
        addAccountStub,
        validationStub,
        authenticationStub,
        sendEmail,
        hashRandomGenerate
    )
    return {
        sut,
        addAccountStub,
        validationStub,
        authenticationStub,
        sendEmail
    }
}

describe('SignUpController', () => {
    test('Should return 500 if an invalid addAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new InternalServerError(null)))
    })
    test('should return 200 if SignUpController return on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ ...makeFakeAccount(), token: 'any_token' })
        )
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
    test('Should call Authenthicate with correct values', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(makeFakeRequest())
        expect(authSpy).toHaveBeenCalledWith({
            email: 'any_email@mail.com',
            password: 'any_password'
        })
    })
    test('Should return 500 if authentication throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 403 if AddAccount return null', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(
            new Promise((resolve) => resolve(null))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
    test('Shoulf call EmailSend how correct values', async () => {
        const { sut, sendEmail } = makeSut()
        const sendEmailSpy = jest.spyOn(sendEmail, 'sendEmail')
        await sut.handle(makeFakeRequest())
        expect(sendEmailSpy).toHaveBeenCalledWith({
            to: 'any_email@mail.com',
            subject: 'Confirma????o de e-mail',
            template: 'confirm_email',
            context: { token: 'any_hash' }
        })
    })
})
