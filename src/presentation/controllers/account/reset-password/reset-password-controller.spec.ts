import {
    notDataExists,
    ok,
    serverError,
    ResetPassword
} from './reset-password-controller-protocols'
import { ResetPasswordController } from './reset-password-controller'
import { Validation } from '../signup/signup-controller-protocols'
import {
    badRequest,
    MissingParamError
} from '../account-enable/account-active-controller-protocols'
import { ResetPasswordParams } from '../../../../domain/usecases/account/reset-password/reset-password'

interface SutTypes {
    sut: ResetPasswordController
    dbResetPasswordStub: ResetPassword
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeDbResetPasswordStub = (): ResetPassword => {
    class DbResetPasswordStub implements ResetPassword {
        async reset(token: ResetPasswordParams): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new DbResetPasswordStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const dbResetPasswordStub = makeDbResetPasswordStub()
    const sut = new ResetPasswordController(validationStub, dbResetPasswordStub)
    return {
        sut,
        dbResetPasswordStub,
        validationStub
    }
}

const makeFakeRequest = () => ({
    body: {
        token: 'any_token',
        password: 'any_password',
        confirmPassword: 'any_password'
    }
})

describe('ResetPasswordController', () => {
    test('Should call resetPassword how correct values', async () => {
        const { sut, dbResetPasswordStub } = makeSut()
        const spyResetPassword = jest.spyOn(dbResetPasswordStub, 'reset')
        await sut.handle(makeFakeRequest())
        expect(spyResetPassword).toHaveBeenCalledWith({
            token: 'any_token',
            password: 'any_password'
        })
    })
    test('Should return 404 resetPassword is not valid', async () => {
        const { sut, dbResetPasswordStub } = makeSut()
        jest.spyOn(dbResetPasswordStub, 'reset').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            notDataExists('Token de redefinição de senha inválido.')
        )
    })
    test('Should 500 if resetPassword return throws', async () => {
        const { sut, dbResetPasswordStub } = makeSut()
        jest.spyOn(dbResetPasswordStub, 'reset').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if resetPassword return true', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ success: 'Boa, agora é só fazer login' })
        )
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
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
