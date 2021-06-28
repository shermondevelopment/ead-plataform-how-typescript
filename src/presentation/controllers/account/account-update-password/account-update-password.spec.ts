import {
    UpdateAccountPassword,
    UpdatePasswordParams,
    Validation,
    ok,
    serverError
} from './account-update-password-protocols'
import { UpdateAccountPasswordController } from './account-update-password'

interface SutTypes {
    sut: UpdateAccountPasswordController
    updatePasswordStub: UpdateAccountPassword
    validationStub: Validation
}

const makeFakeRequest = () => ({
    body: {
        id: 'any_id',
        password: 'new_password',
        confirmPassword: 'new_password',
        currentPassword: 'old_password'
    },
    accountId: 'any_id'
})

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeUpdateAccountPasswordStub = (): UpdateAccountPassword => {
    class UpdateAccountPasswordStub implements UpdateAccountPassword {
        async updatePassword(params: UpdatePasswordParams): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new UpdateAccountPasswordStub()
}

const makeSut = (): SutTypes => {
    const updatePasswordStub = makeUpdateAccountPasswordStub()
    const validationStub = makeValidation()
    const sut = new UpdateAccountPasswordController(
        validationStub,
        updatePasswordStub
    )
    return {
        sut,
        updatePasswordStub,
        validationStub
    }
}

describe('UpdateAccountPasswordController', () => {
    test('Should call UpdatePassword how correct values', async () => {
        const { sut, updatePasswordStub } = makeSut()
        const spyUpdatePassword = jest.spyOn(
            updatePasswordStub,
            'updatePassword'
        )
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(spyUpdatePassword).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should return 500 if UpdatePassword throws', async () => {
        const { sut, updatePasswordStub } = makeSut()
        jest.spyOn(updatePasswordStub, 'updatePassword').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if UpdatePassword return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ success: 'suas informações foram salvas' })
        )
    })
})
