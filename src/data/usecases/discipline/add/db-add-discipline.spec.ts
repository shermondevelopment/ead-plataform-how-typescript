import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'
import { AddDisciplineRepository } from '../../../protocols/db/discipline/add/add-discpline'
import { Slug } from '../../course/add-course/db-add-course-protocols'
import { DbAddDiscipline } from './db-add-discipline'

export interface SutTypes {
    sut: DbAddDiscipline
    slugStub: Slug
    addDisciplineRepositoryStub: AddDisciplineRepository
}

const makeFakeResponse = (): DisciplineModel => ({
    title: 'any title',
    slug: 'any-title'
})

const makeFakeRequest = () => ({
    title: 'any title'
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
        async add(params: DisciplineModel): Promise<DisciplineModel> {
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
        expect(spyDisciplineRepository).toHaveBeenCalledWith(makeFakeResponse())
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
