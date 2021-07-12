import {
    AddModulesModel,
    ok,
    serverError,
    UpdateModule
} from './update-module-controller-protocols'
import { UpdateModuleController } from './update-module-controller'

interface SutTypes {
    sut: UpdateModuleController
    updateModuleStub: UpdateModule
}

const makeFakeRequest = () => ({
    body: {
        title: 'any_title',
        order: 2,
        disciplineId: 'new_id'
    },
    params: {
        id: 'any_module'
    }
})

const makeUpdateModuleStub = (): UpdateModule => {
    class UpdateModuleStub implements UpdateModule {
        async update(
            idModule: string,
            moduleParams: Partial<AddModulesModel>
        ): Promise<number> {
            return new Promise((resolved) => resolved(1))
        }
    }
    return new UpdateModuleStub()
}

const makeSut = (): SutTypes => {
    const updateModuleStub = makeUpdateModuleStub()
    const sut = new UpdateModuleController(updateModuleStub)
    return {
        sut,
        updateModuleStub
    }
}

describe('UpdateModule Controller', () => {
    test('Should call updateModuleStub how correct values', async () => {
        const { sut, updateModuleStub } = makeSut()
        const spyUpdateModule = jest.spyOn(updateModuleStub, 'update')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(spyUpdateModule).toHaveBeenCalledWith(
            httpRequest.params.id,
            httpRequest.body
        )
    })
    test('Should return 500 if UpdateModule return throws', async () => {
        const { sut, updateModuleStub } = makeSut()
        jest.spyOn(updateModuleStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 500 if UpdateModule return throws', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ success: 'updated successfully' }))
    })
})
