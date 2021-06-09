import { UpdateCourseRepository } from '../../../protocols/db/course/db-update-course-repository'
import { CourseModel } from '../loading-course/loading-course-protocols'
import { Slug } from '../../../protocols/remodulate/slug'
import { DbUpdateCourse } from './db-update-course'

interface SutTypes {
    sut: DbUpdateCourse
    slugStub: Slug
}

const makeFakeRequest = () => ({
    title: 'old_title',
    figure: 'old_figure'
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
    // const updateCourseRepositoryStub = makeUpdateCourseRepository()
    const slugStub = makeSlugStub()
    const sut = new DbUpdateCourse(slugStub)
    return {
        sut,
        slugStub
    }
}

describe('DbUpdateCourse UseCase', () => {
    test('Should call slug if title is given', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.update(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('old_title')
    })
})
