import { UnlockedUser } from '../../../domain/usecases/account/unlocked-user/unlocked-user'
import { Validation } from '../../protocols/validation'
import { UnlockedUserController } from './unlocked-user-controller'

interface SutTypes {
    sut: UnlockedUserController
    validationStub: Validation
    unlockedUserStub: UnlockedUser
}

const makeFakeRequest = () => ({
    body: {
        email: 'any_email@mail.com'
    }
})

const makeUnlockedUser = (): UnlockedUser => {
    class UnlockedUserStub implements UnlockedUser {
        async unlocked(email: string): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new UnlockedUserStub()
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const unlockedUserStub = makeUnlockedUser()
    const sut = new UnlockedUserController(validationStub, unlockedUserStub)
    return {
        sut,
        validationStub,
        unlockedUserStub
    }
}

describe('UnlockedUser Controller', () => {
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should call unlockedUser with correct value', async () => {
        const { sut, unlockedUserStub } = makeSut()
        const validateSpy = jest.spyOn(unlockedUserStub, 'unlocked')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
