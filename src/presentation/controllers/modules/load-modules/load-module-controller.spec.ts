import {
    ModulesModel,
    ok,
    serverError,
    LoadModule
} from './load-module-controller-protocols'
import { LoadModuleController } from './load-module-controller'

interface SutTypes {
    sut: LoadModuleController
    loadModuleStub: LoadModule
}

const makeFakeRequest = () => ({
    query: {
        disciplineId: 'any_id'
    }
})

const makeFakeResponse = () => [
    {
        id: 'any_id',
        title: 'any_title',
        slug: 'any-slug',
        order: 1,
        disciplineId: 'any_id'
    }
]

const makeLoadModuleStub = (): LoadModule => {
    class LoadModuleStub implements LoadModule {
        async load(disciplineId: string): Promise<Array<ModulesModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadModuleStub()
}

const makeSut = (): SutTypes => {
    const loadModuleStub = makeLoadModuleStub()
    const sut = new LoadModuleController(loadModuleStub)
    return {
        sut,
        loadModuleStub
    }
}

describe('LoadModule Controller', () => {
    test('Should call loadModule how correct values', async () => {
        const { sut, loadModuleStub } = makeSut()
        const spyLoadModule = jest.spyOn(loadModuleStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(spyLoadModule).toHaveBeenCalledWith('any_id')
    })
    test('Should 500 if loadModule return throws', async () => {
        const { sut, loadModuleStub } = makeSut()
        jest.spyOn(loadModuleStub, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should 200 if loadModule return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeResponse()))
    })
})
