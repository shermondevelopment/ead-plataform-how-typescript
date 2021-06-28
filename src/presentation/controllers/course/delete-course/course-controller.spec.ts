import { serverError, ok } from '../../../helpers/http/http-helper'
import { DeleteCourseController } from './course-controller'
import { HttpRequest, Delete } from './course-controller-protocols'

interface SutTypes {
    sut: DeleteCourseController
    dbDeleteCourse: Delete
}

const makeFakeDeleteCourse = () => {
    class DbDeleteCourse implements Delete {
        async delete(id: string): Promise<any> {
            return new Promise((resolved) => resolved({ deleted: true }))
        }
    }
    return new DbDeleteCourse()
}

const makeSut = (): SutTypes => {
    const dbDeleteCourse = makeFakeDeleteCourse()
    const sut = new DeleteCourseController(dbDeleteCourse)
    return {
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
    test('Should call delete with correct values', async () => {
        const { sut, dbDeleteCourse } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteCourse, 'delete')
        await sut.handle(makeFakeRequest())
        expect(spyDelete).toHaveBeenCalledWith('any_id')
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
        expect(httpResponse).toEqual(ok({ deleted: true }))
    })
})
