import { DbLoadingCourse } from './loading-course'
import {
    ParamCourses,
    LoadCourseRepository,
    CourseArray
} from './loading-course-protocols'

interface SutTypes {
    sut: DbLoadingCourse
    loadCourseRepository: LoadCourseRepository
}

const makeFakeResponseCourse = {
    courseArray: [
        {
            id: 'any_id',
            title: 'any_title',
            figure: 'any_figure',
            slug: 'any_slug'
        }
    ]
}

const makeFakeRequest = () => ({
    search: 'string',
    page: 0
})

const makeFakeCourseRepositoryStub = (): LoadCourseRepository => {
    class LoadCourseRepositoryStub implements LoadCourseRepository {
        async load(param: ParamCourses): Promise<CourseArray> {
            return new Promise((resolved) =>
                resolved({ ...makeFakeResponseCourse, next: false })
            )
        }
    }
    return new LoadCourseRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadCourseRepository = makeFakeCourseRepositoryStub()
    const sut = new DbLoadingCourse(loadCourseRepository)
    return {
        sut,
        loadCourseRepository
    }
}

describe('Loading', () => {
    test('Should call LoadCoursesRepository how correct values', async () => {
        const { sut, loadCourseRepository } = makeSut()
        const spyRepositoryCourse = jest.spyOn(loadCourseRepository, 'load')
        await sut.load(makeFakeRequest())
        expect(spyRepositoryCourse).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should call if LoadCoursesRepository throws', async () => {
        const { sut, loadCourseRepository } = makeSut()
        jest.spyOn(loadCourseRepository, 'load').mockReturnValueOnce(
            new Promise((resolv, reject) => reject(new Error()))
        )
        const promise = sut.load(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return an courses if on success', async () => {
        const { sut } = makeSut()
        const courses = await sut.load(makeFakeRequest())
        expect(courses).toEqual({ ...makeFakeResponseCourse, next: false })
    })
})
