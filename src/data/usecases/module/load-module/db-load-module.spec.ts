import { ModulesModel, LoadModuleRepository } from './db-load-module-protocols'
import { DbLoadModule } from './db-load-module'

interface SutTypes {
    sut: DbLoadModule
    loadModuleRepository: LoadModuleRepository
}

const makeFakeResponse = () => [
    {
        id: 'any_id',
        title: 'any_title',
        slug: 'any-slug',
        order: 1,
        disciplineId: 'any_id'
    }
]

const makeLoadModuleRepositoryStub = (): LoadModuleRepository => {
    class LoadModuleRepositoryStub implements LoadModuleRepository {
        async load(disciplineId: string): Promise<Array<ModulesModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadModuleRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadModuleRepository = makeLoadModuleRepositoryStub()
    const sut = new DbLoadModule(loadModuleRepository)
    return {
        sut,
        loadModuleRepository
    }
}

describe('DbLoadModule', () => {
    test('Should call loadModuleRepository how correct values', async () => {
        const { sut, loadModuleRepository } = makeSut()
        const spyLoadModule = jest.spyOn(loadModuleRepository, 'load')
        await sut.load('any_id', 'any_id')
        expect(spyLoadModule).toHaveBeenCalledWith('any_id', 'any_id')
    })
    test('Should return throws if loadModuleRepository throws', async () => {
        const { sut, loadModuleRepository } = makeSut()
        jest.spyOn(loadModuleRepository, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.load('any_id', 'any_id')
        await expect(promise).rejects.toThrow()
    })
    test('Should return data id loadModuleRepository is success', async () => {
        const { sut } = makeSut()
        const promise = await sut.load('any_id', 'any_id')
        expect(promise).toEqual(makeFakeResponse())
    })
})
