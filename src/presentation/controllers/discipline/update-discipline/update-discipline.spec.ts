import {
    AddDisciplineModel,
    UpdateDiscipline
} from './update-discipline-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { UpdateDisciplineController } from './update-discipline-controller'

interface SutTypes {
    sut: UpdateDisciplineController
    updateDisciplineStub: UpdateDiscipline
}

const makeFakeRequest = () => ({
    params: {
        id: 'valid_id'
    },
    body: {
        title: 'old_title',
        figure: 'old_figure'
    }
})

const makeFakeUpdateStub = (): UpdateDiscipline => {
    class UpdateStub implements UpdateDiscipline {
        async update(
            id: string,
            disciplineModel: AddDisciplineModel
        ): Promise<number> {
            return new Promise((resolved) => resolved(1))
        }
    }
    return new UpdateStub()
}

const makeSut = (): SutTypes => {
    const updateDisciplineStub = makeFakeUpdateStub()
    const sut = new UpdateDisciplineController(updateDisciplineStub)
    return {
        sut,
        updateDisciplineStub
    }
}

describe('UpdateControllerDiscipline', () => {
    test('Should call update how correct values', async () => {
        const { sut, updateDisciplineStub } = makeSut()
        const spyUpdate = jest.spyOn(updateDisciplineStub, 'update')
        await sut.handle(makeFakeRequest())
        expect(spyUpdate).toHaveBeenCalledWith(
            { id: 'valid_id' },
            {
                title: 'old_title',
                figure: 'old_figure'
            }
        )
    })
    test('Should return 500 if UpdateCourse return throws', async () => {
        const { sut, updateDisciplineStub } = makeSut()
        jest.spyOn(updateDisciplineStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if UpdateCourse return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ success: 'updated successfully' }))
    })
})
