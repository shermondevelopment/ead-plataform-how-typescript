import {
    LoadCourses,
    ParamCourses
} from '../../../../domain/usecases/load-courses/load-course'
import {
    HttpRequest,
    Validation
} from '../../signup/signup-controller-protocols'
import { CourseModel } from '../../../../domain/models/course-model'
import { LoadCourseController } from './course-controller'

interface SutTypes {
    loadCoursesStub: LoadCourses
    sut: LoadCourseController
}

const makeFakeRequest = (): HttpRequest => ({
    query: {
        search: 'any_value',
        page: 1
    }
})

const makeFakeResponseCourse = (): CourseModel => ({
    id: 'any_id',
    title: 'any_title',
    figure: 'any_figure',
    slug: 'any_slug'
})

const makeLoadCourses = (): LoadCourses => {
    class LoadCoursesStub implements LoadCourses {
        async load(params: ParamCourses): Promise<CourseModel> {
            return new Promise((resolve) => resolve(makeFakeResponseCourse()))
        }
    }
    return new LoadCoursesStub()
}

const makeSut = (): SutTypes => {
    const loadCoursesStub = makeLoadCourses()
    const sut = new LoadCourseController(loadCoursesStub)
    return {
        sut,
        loadCoursesStub
    }
}

describe('Show Course', () => {
    test('Should call loadCourse with correct values', async () => {
        const { sut, loadCoursesStub } = makeSut()
        const spyLoadCourses = jest.spyOn(loadCoursesStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(spyLoadCourses).toHaveBeenCalledWith({
            search: 'any_value',
            page: 1
        })
    })
})
