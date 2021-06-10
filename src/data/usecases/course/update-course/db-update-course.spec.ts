import { UpdateCourseRepository } from '../../../protocols/db/course/db-update-course-repository'
import { CourseModel } from '../loading-course/loading-course-protocols'
import { Slug } from '../../../protocols/remodulate/slug'
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
            course: Partial<CourseModel>
        ): Promise<Partial<CourseModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
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
        await sut.update(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('new_title')
    })
    test('Should call UpdateCourseRepository how correct values', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateCourseRepositoryStub, 'update')
        await sut.update(makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith(makeFakeResponse())
    })
    test('Should call UpdateCourseRepository without the title parameter', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        const spyUpdate = jest.spyOn(updateCourseRepositoryStub, 'update')
        await sut.update({ figure: 'new_figure' })
        expect(spyUpdate).toHaveBeenCalledWith({ figure: 'new_figure' })
    })
    test('Should throws UpdateCourseRepository return throws', async () => {
        const { sut, updateCourseRepositoryStub } = makeSut()
        jest.spyOn(updateCourseRepositoryStub, 'update').mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.update({ figure: 'new_figure' })
        await expect(promise).rejects.toThrow()
    })
    test('Should UpdateCourseRepository return value how success', async () => {
        const { sut } = makeSut()
        const updateCourse = await sut.update(makeFakeRequest())
        expect(updateCourse).toEqual(makeFakeResponse())
    })
})
