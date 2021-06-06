import {
    HttpRequest,
    LoadCourses,
    ParamCourses,
    CourseArray
} from './course-controller-protocols'
import { LoadCourseController } from './course-controller'
import { ok, serverError } from '../../../helpers/http/http-helper'

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

const makeFakeResponseCourse = {
    courseArray: [
        {
            id: 'any_id',
            title: 'any_title',
            figure: 'any_figure',
            slug: 'any_slug'
        }
    ],
    next: false
}

const makeLoadCourses = (): LoadCourses => {
    class LoadCoursesStub implements LoadCourses {
        async load(params: ParamCourses): Promise<CourseArray> {
            return new Promise((resolve) => resolve(makeFakeResponseCourse))
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
    test('Should return 500 if loadCourse throws', async () => {
        const { sut, loadCoursesStub } = makeSut()
        jest.spyOn(loadCoursesStub, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if loadCourse return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeResponseCourse))
    })
})
