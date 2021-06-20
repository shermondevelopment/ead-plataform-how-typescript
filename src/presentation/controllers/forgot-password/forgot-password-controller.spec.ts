import {
    ForgotPassword,
    ForgotPasswordRequest
} from '../../../domain/usecases/forgot-password/forgot-password'
import { MissingParamError } from '../../erros'
import {
    badRequest,
    notDataExists,
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { Validation } from '../signup/signup-controller-protocols'
import { ForgotPasswordController } from './forgot-password-controller'

interface SutTypes {
    validationStub: Validation
    sut: ForgotPasswordController
    forgotPassword: ForgotPassword
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
        async email(email: ForgotPasswordRequest): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new DbForgotPassword()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidationsStub()
    const forgotPassword = makeForgotPasswordStub()
    const sut = new ForgotPasswordController(validationStub, forgotPassword)
    return {
        sut,
        validationStub,
        forgotPassword
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
        const { sut, forgotPassword } = makeSut()
        const spyForgotPassword = jest.spyOn(forgotPassword, 'email')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(spyForgotPassword).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should return MissingParamError if ForgotPassword return false', async () => {
        const { sut, forgotPassword } = makeSut()
        jest.spyOn(forgotPassword, 'email').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(notDataExists('Usuário'))
    })
    test('Should return 500 if ForgotPassword throws', async () => {
        const { sut, forgotPassword } = makeSut()
        jest.spyOn(forgotPassword, 'email').mockReturnValueOnce(
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
