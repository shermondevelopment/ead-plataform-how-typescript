import { MissingParamError } from '../../../erros'
import { badRequest } from '../../../helpers/http/http-helper'
import { Validation } from '../../signup/signup-controller-protocols'
import { AddCourseController } from './course-controller'

interface SutTypes {
    sut: AddCourseController
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new AddCourseController(validationStub)
    return {
        sut,
        validationStub
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
})
