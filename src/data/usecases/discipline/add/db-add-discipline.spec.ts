import {
    DisciplineModel,
    AddDisciplineRepository,
    AddDisciplineModel,
    Slug
} from './db-add-discipline-protocols'
import { DbAddDiscipline } from './db-add-discipline'

export interface SutTypes {
    sut: DbAddDiscipline
    slugStub: Slug
    addDisciplineRepositoryStub: AddDisciplineRepository
}

const makeFakeResponse = (): DisciplineModel => ({
    id: 'any_id',
    title: 'any title',
    slug: 'any-title',
    qt_modules: 10,
    courseId: 'any_id'
})

const makeFakeRequest = (): AddDisciplineModel => ({
    title: 'any title',
    slug: 'any-title',
    qt_modules: 10,
    courseId: 'any_id'
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'any-title'
        }
    }
    return new SlugStub()
}

const makeAddRepositoryRepository = (): AddDisciplineRepository => {
    class AddDisciplineRepositoryStub implements AddDisciplineRepository {
        async add(params: AddDisciplineModel): Promise<DisciplineModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddDisciplineRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addDisciplineRepositoryStub = makeAddRepositoryRepository()
    const slugStub = makeSlugStub()
    const sut = new DbAddDiscipline(slugStub, addDisciplineRepositoryStub)
    return {
        sut,
        slugStub,
        addDisciplineRepositoryStub
    }
}

describe('DbAddDiscipline', async () => {
    test('Should call slug how correct values', async () => {
        const { sut, slugStub } = makeSut()
        const sypSlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest())
        expect(sypSlug).toHaveBeenCalledWith('any title')
    })
    test('Should throw if Slug return throws', async () => {
        const { sut, slugStub } = makeSut()
        jest.spyOn(slugStub, 'transform').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = sut.add(makeFakeRequest())
        await expect(httpResponse).rejects.toThrow()
    })
    test('Should call addDisciplineRepository how correct values', async () => {
        const { sut, addDisciplineRepositoryStub } = makeSut()
        const spyDisciplineRepository = jest.spyOn(
            addDisciplineRepositoryStub,
            'add'
        )
        await sut.add(makeFakeRequest())
        expect(spyDisciplineRepository).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should throw if addDisciplineRepository return throws', async () => {
        const { sut, addDisciplineRepositoryStub } = makeSut()
        jest.spyOn(addDisciplineRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return an discipline if on success', async () => {
        const { sut } = makeSut()
        const promise = await sut.add(makeFakeRequest())
        expect(promise).toEqual(makeFakeResponse())
    })
})
