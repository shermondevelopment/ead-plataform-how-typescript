import { DbAddModule } from './db-add-module'
import {
    Slug,
    ModulesModel,
    AddModulesModelRepository,
    AddModuleRepository
} from './db-add-module-protocols'

interface SutTypes {
    sut: DbAddModule
    addModuleRepositoryStub: AddModuleRepository
    slugStub: Slug
}

const makeFakeRequest = () => ({
    title: 'any_title',
    slug: 'valid-slug',
    order: 2,
    qt_materials: 0,
    disciplineId: 'any_discipline'
})
const makeFakeResponse = () => ({
    id: 'any_id',
    title: 'any_title',
    slug: 'valid_slug',
    order: 2,
    qt_materials: 0,
    disciplineId: 'any_discipline'
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'valid-slug'
        }
    }
    return new SlugStub()
}

const makeAddModuleRepository = (): AddModuleRepository => {
    class AddModuleRepositoryStub implements AddModuleRepository {
        async add(modules: AddModulesModelRepository): Promise<ModulesModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddModuleRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addModuleRepositoryStub = makeAddModuleRepository()
    const slugStub = makeSlugStub()
    const sut = new DbAddModule(slugStub, addModuleRepositoryStub)
    return {
        sut,
        addModuleRepositoryStub,
        slugStub
    }
}

describe('DbAddModule', () => {
    test('Should call Slug with correct value', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any_title')
    })
    test('Should throw if Slug return throws', async () => {
        const { sut, slugStub } = makeSut()
        jest.spyOn(slugStub, 'transform').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = sut.add(makeFakeRequest())
        await expect(httpResponse).rejects.toThrow()
    })
    test('Should call addModule how correct values', async () => {
        const { sut, addModuleRepositoryStub } = makeSut()
        const spyAddModule = jest.spyOn(addModuleRepositoryStub, 'add')
        await sut.add(makeFakeRequest())
        expect(spyAddModule).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should call if AddModulesRepository throws', async () => {
        const { sut, addModuleRepositoryStub } = makeSut()
        jest.spyOn(addModuleRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should AddModulesRepository return success', async () => {
        const { sut } = makeSut()
        const response = await sut.add(makeFakeRequest())
        expect(response).toEqual(makeFakeResponse())
    })
})
