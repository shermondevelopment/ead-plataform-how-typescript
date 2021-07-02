import {
    Slug,
    UpdateCourseRepository,
    AddDisciplineModel,
    UpdateDisciplineRepository
} from './db-update-discipline-protocols'
import { DbUpdateDiscipline } from './db-update-discipline'

interface SutTypes {
    sut: DbUpdateDiscipline
    slugStub: Slug
    updateDisciplineRepositoryStub: UpdateCourseRepository
}

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'new-title'
        }
    }
    return new SlugStub()
}

const makeFakeRequest = () => ({
    title: 'any title',
    slug: 'new-title'
})

const makeUpdateCourseRepository = (): UpdateDisciplineRepository => {
    class UpdateDisciplineRepositoryStub implements UpdateDisciplineRepository {
        async update(id: any, discipline: AddDisciplineModel): Promise<number> {
            return new Promise((resolved) => resolved(1))
        }
    }
    return new UpdateDisciplineRepositoryStub()
}

const makeSut = (): SutTypes => {
    const updateDisciplineRepositoryStub = makeUpdateCourseRepository()
    const slugStub = makeSlugStub()
    const sut = new DbUpdateDiscipline(slugStub, updateDisciplineRepositoryStub)
    return {
        sut,
        slugStub,
        updateDisciplineRepositoryStub
    }
}

describe('DbUpdateCourse UseCase', () => {
    test('Should call slug if title is given', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.update('valid_id', makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any title')
    })
    test('Should call UpdateCourseRepository how correct values', async () => {
        const { sut, updateDisciplineRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateDisciplineRepositoryStub, 'update')
        await sut.update('valid_id', makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith('valid_id', makeFakeRequest())
    })
    test('Should call UpdateCourseRepository without the title parameter', async () => {
        const { sut, updateDisciplineRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateDisciplineRepositoryStub, 'update')
        await sut.update('valid_id', makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith('valid_id', makeFakeRequest())
    })
    test('Should throws UpdateCourseRepository return throws', async () => {
        const { sut, updateDisciplineRepositoryStub } = makeSut()
        jest.spyOn(updateDisciplineRepositoryStub, 'update').mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.update('valid_id', makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should UpdateCourseRepository return value how success', async () => {
        const { sut } = makeSut()
        const updateCourse = await sut.update('valid_id', makeFakeRequest())
        expect(updateCourse).toBe(1)
    })
})
