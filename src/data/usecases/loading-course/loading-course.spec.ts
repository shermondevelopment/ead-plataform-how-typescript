import { DbLoadingCourse } from './loading-course'
import {
    ParamCourses,
    CourseModel,
    LoadCourseRepository
} from './loading-course-protocols'

interface SutTypes {
    sut: DbLoadingCourse
    loadCourseRepository: LoadCourseRepository
}

const makeFakeResponseCourse = (): CourseModel => ({
    id: 'any_id',
    title: 'any_title',
    figure: 'any_figure',
    slug: 'any_slug'
})

const makeFakeRequest = () => ({
    search: 'string',
    page: 0
})

const makeFakeCourseRepositoryStub = (): LoadCourseRepository => {
    class LoadCourseRepositoryStub implements LoadCourseRepository {
        async load(param: ParamCourses): Promise<CourseModel> {
            return new Promise((resolved) => resolved(makeFakeResponseCourse()))
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
})
