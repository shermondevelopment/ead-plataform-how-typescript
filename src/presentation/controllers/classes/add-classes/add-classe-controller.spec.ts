import {
    badRequest,
    ok,
    serverError,
    Validation,
    AddClasseModel,
    AddClasse,
    ClasseModel
} from './add-classe-controller-protocols'
import { AddClassesController } from './add-classe-controller'

interface SutTypes {
    sut: AddClassesController
    validationStub: Validation
    addClassStub: AddClasse
}

const makeFakeRequest = () => ({
    body: {
        title: 'any title',
        url: 'any_url',
        order: 0,
        moduleId: 'any_id'
    }
})

const makeFakeResponse = () => ({
    id: 'any_id',
    title: 'any title',
    slug: 'any-title',
    url: 'any_url',
    order: 0,
    moduleId: 'any_id'
})

const makeAddClasses = (): AddClasse => {
    class AddClassStub implements AddClasse {
        async add(classesParams: AddClasseModel): Promise<ClasseModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddClassStub()
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
    const addClassStub = makeAddClasses()
    const validationStub = makeValidation()
    const sut = new AddClassesController(validationStub, addClassStub)
    return {
        sut,
        validationStub,
        addClassStub
    }
}

describe('AddClasses Controller', () => {
    test('Should call Validation how correct values', async () => {
        const { sut, validationStub } = makeSut()
        const spyAddClasses = jest.spyOn(validationStub, 'validate')
        await sut.handle(makeFakeRequest())
        expect(spyAddClasses).toHaveBeenCalledWith(makeFakeRequest().body)
    })
    test('Should return if Validation return error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })
    test('Should call AddClasseStub how correct values', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })
    test('Should throws AddClasseStub return throws', async () => {
        const { sut, addClassStub } = makeSut()
        jest.spyOn(addClassStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if AddClasseStub return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(httpResponse.body))
    })
})
