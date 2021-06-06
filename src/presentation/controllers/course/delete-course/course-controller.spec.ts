import { MissingParamError } from '../../../erros'
import { badRequest, serverError, ok } from '../../../helpers/http/http-helper'
import { DeleteCourseController } from './course-controller'
import {
    HttpRequest,
    Validation,
    Delete,
    DeleteParam,
    ReturnDelete
} from './course-controller-protocols'

interface SutTypes {
    sut: DeleteCourseController
    validationStub: Validation
    dbDeleteCourse: Delete
}

const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeFakeDeleteCourse = () => {
    class DbDeleteCourse implements Delete {
        async delete(param: DeleteParam): Promise<ReturnDelete> {
            return new Promise((resolved) =>
                resolved({
                    delete: true
                })
            )
        }
    }
    return new DbDeleteCourse()
}

const makeSut = (): SutTypes => {
    const dbDeleteCourse = makeFakeDeleteCourse()
    const validationStub = makeValidationStub()
    const sut = new DeleteCourseController(validationStub, dbDeleteCourse)
    return {
        validationStub,
        sut,
        dbDeleteCourse
    }
}

const makeFakeRequest = (): HttpRequest => ({
    params: {
        id: 'any_id'
    }
})

describe('DeleteController Course', () => {
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const spyValidate = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(spyValidate).toHaveBeenCalledWith(httpRequest.params)
    })
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('any_field')
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('any_field'))
        )
    })
    test('should call delete with correct values', async () => {
        const { sut, dbDeleteCourse } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteCourse, 'delete')
        await sut.handle(makeFakeRequest())
        expect(spyDelete).toHaveBeenCalledWith({ id: 'any_id' })
    })
    test('Should return 500 if delete throws', async () => {
        const { sut, dbDeleteCourse } = makeSut()
        jest.spyOn(dbDeleteCourse, 'delete').mockReturnValueOnce(
            new Promise((resolv, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if delete an success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ delete: true }))
    })
})
