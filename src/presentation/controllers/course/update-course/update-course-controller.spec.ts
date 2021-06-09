import { ok, serverError } from '../../../helpers/http/http-helper'
import { UpdateCourseController } from './update-course-controller'
import {
    UpdateCourse,
    AddCourseModel
} from './update-course-controller-protocols'

interface SutTypes {
    sut: UpdateCourseController
    updateCourseStub: UpdateCourse
}

const makeFakeRequest = () => ({
    body: {
        title: 'old_title',
        figure: 'old_figure'
    }
})

const makeFakeResponse = () => ({
    title: 'new_title',
    figure: 'new_figure'
})

const makeFakeUpdateStub = (): UpdateCourse => {
    class UpdateStub implements UpdateCourse {
        async update(
            courseModel: Partial<AddCourseModel>
        ): Promise<Partial<AddCourseModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new UpdateStub()
}

const makeSut = (): SutTypes => {
    const updateCourseStub = makeFakeUpdateStub()
    const sut = new UpdateCourseController(updateCourseStub)
    return {
        sut,
        updateCourseStub
    }
}

describe('UpdateControllerCourse', () => {
    test('Should call update how correct values', async () => {
        const { sut, updateCourseStub } = makeSut()
        const spyUpdate = jest.spyOn(updateCourseStub, 'update')
        await sut.handle(makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith({
            title: 'old_title',
            figure: 'old_figure'
        })
    })
    test('Should return 500 if UpdateCourse return throws', async () => {
        const { sut, updateCourseStub } = makeSut()
        jest.spyOn(updateCourseStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if UpdateCourse return success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            ok({ title: 'new_title', figure: 'new_figure' })
        )
    })
})
