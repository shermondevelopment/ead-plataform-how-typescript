import {
    badRequest,
    ok,
    serverError,
    MissingParamError,
    Validation,
    AddProgressModel,
    AddProgress
} from './add-progress-controller-protocols'
import { AddProgressController } from './add-progress-controller'

interface SutTypes {
    sut: AddProgressController
    addProgressStub: AddProgress
    validationStub: Validation
}

const makeFakeRequest = () => ({
    accountId: 'any_id',
    body: {
        totalItems: 0,
        completedItems: 0,
        disciplineId: 'any_id',
        moduleId: 'any_id'
    }
})

const makeAddProgress = (): AddProgress => {
    class AddProgressStub implements AddProgress {
        async add(params: AddProgressModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddProgressStub()
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
    const addProgressStub = makeAddProgress()
    const validationStub = makeValidation()
    const sut = new AddProgressController(validationStub, addProgressStub)
    return {
        sut,
        addProgressStub,
        validationStub
    }
}

describe('AddProgress Controller', () => {
    test('Should call validationStub how correct values', async () => {
        const { sut, validationStub } = makeSut()
        const spyValidate = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(spyValidate).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('any_field')
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('any_field'))
        )
    })
    test('Should call addProgressStub how correct values', async () => {
        const { sut, addProgressStub } = makeSut()
        const spyAddProgress = jest.spyOn(addProgressStub, 'add')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(spyAddProgress).toHaveBeenCalledWith({
            user_id: 'any_id',
            ...httpRequest.body
        })
    })
    test('Should return 500 if addProgressStub throws', async () => {
        const { sut, addProgressStub } = makeSut()
        jest.spyOn(addProgressStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if addProgressStub success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(null))
    })
})
