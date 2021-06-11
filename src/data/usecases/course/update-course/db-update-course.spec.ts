import {
    AddCourseModel,
    Slug,
    UpdateCourseRepository
} from './db-update-course-protocols'
import { DbUpdateCourse } from './db-update-course'

interface SutTypes {
    sut: DbUpdateCourse
    slugStub: Slug
    updateCourseRepositoryStub: UpdateCourseRepository
}

const makeFakeRequest = () => ({
    title: 'new_title',
    figure: 'new_figure'
})

const makeFakeResponse = () => ({
    id: 'old-id',
    title: 'new_title',
    figure: 'new_figure',
    slug: 'new-title'
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'new-title'
        }
    }
    return new SlugStub()
}

const makeUpdateCourseRepository = (): UpdateCourseRepository => {
    class UpdateCourseRepositoryStub implements UpdateCourseRepository {
        async update(
            id: any,
            course: Partial<AddCourseModel>
        ): Promise<number> {
            return new Promise((resolved) => resolved(1))
        }
    }
    return new UpdateCourseRepositoryStub()
}

const makeSut = (): SutTypes => {
    const updateCourseRepositoryStub = makeUpdateCourseRepository()
    const slugStub = makeSlugStub()
    const sut = new DbUpdateCourse(slugStub, updateCourseRepositoryStub)
    return {
        sut,
        slugStub,
        updateCourseRepositoryStub
    }
}

describe('DbUpdateCourse UseCase', () => {
    test('Should call slug if title is given', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.update({ id: 'valid_id' }, makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('new_title')
    })
    test('Should call UpdateCourseRepository how correct values', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateCourseRepositoryStub, 'update')
        await sut.update({ id: 'valid_id' }, makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith(
            { id: 'valid_id' },
            {
                ...makeFakeRequest(),
                slug: 'new-title'
            }
        )
    })
    test('Should call UpdateCourseRepository without the title parameter', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateCourseRepositoryStub, 'update')
        await sut.update({ id: 'valid_id' }, { figure: 'new_figure' })
        expect(spyUpdate).toHaveBeenCalledWith(
            { id: 'valid_id' },
            { figure: 'new_figure' }
        )
    })
    test('Should throws UpdateCourseRepository return throws', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        jest.spyOn(updateCourseRepositoryStub, 'update').mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.update({ id: 'valid_id' }, { figure: 'new_figure' })
        await expect(promise).rejects.toThrow()
    })
    test('Should UpdateCourseRepository return value how success', async () => {
        const { sut } = makeSut()
        const updateCourse = await sut.update(
            { id: 'valid_id' },
            makeFakeRequest()
        )
        expect(updateCourse).toBe(1)
    })
})
