import {
    badRequest,
    ok,
    serverError,
    ModulesModel,
    AddModules,
    AddModulesModel,
    MissingParamError,
    Validation
} from './add-modules-controller-protocols'
import { AddModulesController } from './add-modules-controller'

interface SutTypes {
    sut: AddModulesController
    validationStub: Validation
    addModulesStub: AddModules
}

const makeFakeResponse = (): ModulesModel => ({
    id: 'any_id',
    title: 'any_title',
    slug: 'any_slug',
    order: 1,
    disciplineId: 'any_discipline'
})

const makeFakeRequest = () => ({
    body: {
        title: 'any_title',
        order: 'any_order',
        qtmaterials: 0,
        disciplineId: 'any_discipline'
    }
})

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeAddModulesStub = (): AddModules => {
    class AddModulesStub implements AddModules {
        async add(modules: AddModulesModel): Promise<ModulesModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddModulesStub()
}

const makeSut = (): SutTypes => {
    const addModulesStub = makeAddModulesStub()
    const validationStub = makeValidation()
    const sut = new AddModulesController(validationStub, addModulesStub)
    return {
        sut,
        validationStub,
        addModulesStub
    }
}

describe('AddModules Controller', () => {
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
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
    test('Should call addModules how correct values', async () => {
        const { sut, addModulesStub } = makeSut()
        const spyModules = jest.spyOn(addModulesStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(spyModules).toHaveBeenCalledWith(makeFakeRequest().body)
    })
    test('Should return 500 addModules return throws', async () => {
        const { sut, addModulesStub } = makeSut()
        jest.spyOn(addModulesStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 addModules return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeResponse()))
    })
})
