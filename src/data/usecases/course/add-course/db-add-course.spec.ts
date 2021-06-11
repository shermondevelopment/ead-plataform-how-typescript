import { CourseModel } from '../../../../domain/models/course-model'
import {
    AddCourse,
    AddCourseModel,
    AddCourseRepository,
    Slug
} from './db-add-course-protocols'
import { DbAddCourse } from './db-add-course'

interface SutTypes {
    sut: AddCourse
    slugStub: Slug
    addCourseRepository: AddCourseRepository
}

const makeFakeRequest = (): AddCourseModel => ({
    title: 'valid_slug',
    figure: 'valid_figure',
    slug: 'valid_slug'
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'valid-slug'
        }
    }
    return new SlugStub()
}

const makeFakeResponse = (): CourseModel => ({
    id: 'valid_id',
    title: 'valid_title',
    figure: 'valid_figure',
    slug: 'valid-slug'
})

const makeAddCourseRepository = (): AddCourseRepository => {
    class AddCourseRepositoryStub implements AddCourseRepository {
        async add(course: AddCourseModel): Promise<CourseModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddCourseRepositoryStub()
}

const makeSut = (): SutTypes => {
    const slugStub = makeSlugStub()
    const addCourseRepository = makeAddCourseRepository()
    const sut = new DbAddCourse(slugStub, addCourseRepository)
    return {
        sut,
        slugStub,
        addCourseRepository
    }
}

describe('DbAddCourse Usecase', () => {
    test('Should call Slug with correct value', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('valid_slug')
    })
    test('Should throw if Slug return throws', async () => {
        const { sut, slugStub } = makeSut()
        jest.spyOn(slugStub, 'transform').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = sut.add(makeFakeRequest())
        await expect(httpResponse).rejects.toThrow()
    })
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addCourseRepository } = makeSut()
        const spyCourse = jest.spyOn(addCourseRepository, 'add')
        await sut.add(makeFakeRequest())
        expect(spyCourse).toHaveBeenCalledWith({
            title: 'valid_slug',
            figure: 'valid_figure',
            slug: 'valid-slug'
        })
    })
    test('Should return throws if AddAccountRepository return throws', async () => {
        const { sut, addCourseRepository } = makeSut()
        jest.spyOn(addCourseRepository, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const httpResponse = sut.add(makeFakeRequest())
        await expect(httpResponse).rejects.toThrow()
    })
    test('Should return an course if on success', async () => {
        const { sut } = makeSut()
        const course = await sut.add(makeFakeRequest())
        expect(course).toEqual(makeFakeResponse())
    })
})
