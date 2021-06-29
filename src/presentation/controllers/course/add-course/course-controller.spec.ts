import { CourseModel } from '../../../../domain/models/course/course-model'
import {
    AddCourse,
    AddCourseModel
} from '../../../../domain/usecases/course/add-course/add-course'
import { MissingParamError } from '../../../erros'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../account/signup/signup-controller-protocols'
import { AddCourseController } from './course-controller'

interface SutTypes {
    sut: AddCourseController
    validationStub: Validation
    addCourseStub: AddCourse
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeFakeResponseCourse = (): CourseModel => ({
    id: 'any_id',
    title: 'any_title',
    figure: 'any_figure',
    slug: 'any_slug'
})

const makeFakeRequestCourse = (): any => ({
    body: {
        title: 'any_title',
        figure: 'any_figure'
    }
})

const makeAddCourse = (): AddCourse => {
    class AddCourseStub implements AddCourse {
        async add(course: AddCourseModel): Promise<CourseModel> {
            return new Promise((resolved) => resolved(makeFakeResponseCourse()))
        }
    }
    return new AddCourseStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const addCourseStub = makeAddCourse()
    const sut = new AddCourseController(validationStub, addCourseStub)
    return {
        sut,
        validationStub,
        addCourseStub
    }
}

describe('Course Controller', () => {
    test('Should return 400 if the title parameter is not sent', async () => {
        const { sut, validationStub } = makeSut()
        const httpRequest = {
            body: {
                figure: 'any_figure'
            }
        }
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('title')
        )
        const courseError = await sut.handle(httpRequest)
        expect(courseError).toEqual(badRequest(new MissingParamError('title')))
    })
    test('Should return 400 if the figure parameter is not sent', async () => {
        const { sut, validationStub } = makeSut()
        const httpRequest = {
            body: {
                title: 'any_title'
            }
        }
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('figure')
        )
        const courseError = await sut.handle(httpRequest)
        expect(courseError).toEqual(badRequest(new MissingParamError('figure')))
    })
    test('Should call AddCourse how correct values', async () => {
        const { sut, addCourseStub } = makeSut()
        const spyAddCourse = jest.spyOn(addCourseStub, 'add')
        await sut.handle(makeFakeRequestCourse())
        expect(spyAddCourse).toHaveBeenCalledWith({
            title: 'any_title',
            figure: 'any_figure'
        })
    })
    test('Should return 500 if AddCourse return throws', async () => {
        const { sut, addCourseStub } = makeSut()
        jest.spyOn(addCourseStub, 'add').mockReturnValue(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequestCourse())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if AddCourse return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequestCourse())
        expect(httpResponse).toEqual(ok(makeFakeResponseCourse()))
    })
})
