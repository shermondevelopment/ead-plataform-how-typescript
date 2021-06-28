import {
    ForgotPassword,
    ForgotPasswordRequest,
    Validation,
    MissingParamError
} from './forgot-password-controller-protocols'

import {
    badRequest,
    notDataExists,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { ForgotPasswordController } from './forgot-password-controller'
import {
    EmailSendParams,
    HashRandomGenerate,
    SendEmail
} from '../../../protocols'

interface SutTypes {
    validationStub: Validation
    sut: ForgotPasswordController
    forgotPassword: ForgotPassword
    tokenResetPassword: HashRandomGenerate
    tokenResetExpired: number
}

const makeValidationsStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeForgotPasswordStub = (): ForgotPassword => {
    class DbForgotPassword implements ForgotPassword {
        async request(data: ForgotPasswordRequest): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new DbForgotPassword()
}

const makeRandomGenerateHash = (): HashRandomGenerate => {
    class HashGenerateAdapterStub implements HashRandomGenerate {
        generateHash(): string {
            return 'any_hash'
        }
    }
    return new HashGenerateAdapterStub()
}

const makeSendEmail = (): SendEmail => {
    class EmailSendStub implements SendEmail {
        async sendEmail(paramsEmail: EmailSendParams): Promise<void> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new EmailSendStub()
}

const makeFakeData = (): number => {
    const data = new Date()
    return data.setDate(data.getHours() + 48)
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidationsStub()
    const forgotPassword = makeForgotPasswordStub()
    const tokenResetPassword = makeRandomGenerateHash()
    const tokenResetExpired = makeFakeData()
    const emailSend = makeSendEmail()
    const sut = new ForgotPasswordController(
        validationStub,
        forgotPassword,
        tokenResetPassword,
        tokenResetExpired,
        emailSend
    )
    return {
        sut,
        validationStub,
        forgotPassword,
        tokenResetPassword,
        tokenResetExpired
    }
}

const makeFakeRequest = () => ({
    body: {
        email: 'any_email@mail.com'
    }
})

describe('ForgotPassword', () => {
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
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
    test('Should call ForgotPassword how correct values', async () => {
        const {
            sut,
            forgotPassword,
            tokenResetPassword,
            tokenResetExpired
        } = makeSut()
        const spyForgotPassword = jest.spyOn(forgotPassword, 'request')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(spyForgotPassword).toHaveBeenCalledWith({
            email: httpRequest.body.email,
            tokenResetExpired,
            tokenResetPassword: tokenResetPassword.generateHash()
        })
    })
    test('Should return MissingParamError if ForgotPassword return false', async () => {
        const { sut, forgotPassword } = makeSut()
        jest.spyOn(forgotPassword, 'request').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(notDataExists('Usuário não encontrado'))
    })
    test('Should return 500 if ForgotPassword throws', async () => {
        const { sut, forgotPassword } = makeSut()
        jest.spyOn(forgotPassword, 'request').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('should return 200 if ForgotPassword return on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ success: 'Quase lá, dê uma checada em seu e-mail' })
        )
    })
})
