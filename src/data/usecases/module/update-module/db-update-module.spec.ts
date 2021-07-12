import {
    AddModulesModelRepository,
    Slug,
    UpdateModuleRepository
} from './db-update-module-protocols'
import { DbUpdateModule } from './db-update-module'

interface SutTypes {
    sut: DbUpdateModule
    slugStub: Slug
    updateModuleRepository: UpdateModuleRepository
}

const makeFakeRequest = () => ({
    title: 'any title',
    slug: 'new-title',
    order: 2
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'new-title'
        }
    }
    return new SlugStub()
}

const makeUpdateModuleRepository = (): UpdateModuleRepository => {
    class UpdateModuleRepositoryStub implements UpdateModuleRepository {
        async update(
            moduleId: string,
            modelUpdate: Partial<AddModulesModelRepository>
        ): Promise<number> {
            return new Promise((resolved) => resolved(1))
        }
    }
    return new UpdateModuleRepositoryStub()
}

const makeSut = (): SutTypes => {
    const slugStub = makeSlugStub()
    const updateModuleRepository = makeUpdateModuleRepository()
    const sut = new DbUpdateModule(slugStub, updateModuleRepository)
    return {
        sut,
        slugStub,
        updateModuleRepository
    }
}

describe('DbUpdateModule', () => {
    test('Should call slug if title is given', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.update('valid_id', makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any title')
    })
    test('Should call UpdateModuleRepository how correct values', async () => {
        const { sut, updateModuleRepository } = makeSut()
        const spyUpdate = jest.spyOn(updateModuleRepository, 'update')
        await sut.update('any_id', makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith('any_id', makeFakeRequest())
    })
    test('Should throws UpdateModuleRepository return throws', async () => {
        const { sut, updateModuleRepository } = makeSut()
        jest.spyOn(updateModuleRepository, 'update').mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.update('valid_id', makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should UpdateModuleRepository return value how success', async () => {
        const { sut } = makeSut()
        const updateCourse = await sut.update('valid_id', makeFakeRequest())
        expect(updateCourse).toBe(1)
    })
})
