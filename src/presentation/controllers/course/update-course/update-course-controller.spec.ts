import { UpdateCourse } from '../../../../domain/usecases/update-course/update-course'
import { AddCourseModel } from '../add-course/course-controller-protocols'
import { UpdateCourseController } from './update-course-controller'

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
})
