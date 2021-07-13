import { ok, serverError, HttpRequest, Delete } from './delete-module-protocols'
import { DeleteModuleController } from './delete-modules-controller'

interface SutTypes {
    sut: DeleteModuleController
    dbDeleteModuleStub: Delete
}

const makeFakeRequest = (): HttpRequest => ({
    params: {
        id: 'any_id'
    }
})

const makeFakeDeleteModule = () => {
    class DbDeleteModuleStub implements Delete {
        async delete(id: string): Promise<any> {
            return new Promise((resolved) => resolved({ deleted: true }))
        }
    }
    return new DbDeleteModuleStub()
}

const makeSut = (): SutTypes => {
    const dbDeleteModuleStub = makeFakeDeleteModule()
    const sut = new DeleteModuleController(dbDeleteModuleStub)
    return {
        sut,
        dbDeleteModuleStub
    }
}

describe('DeleteModule Controller', () => {
    test('Should call delete with correct values', async () => {
        const { sut, dbDeleteModuleStub } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteModuleStub, 'delete')
        await sut.handle(makeFakeRequest())
        expect(spyDelete).toHaveBeenCalledWith('any_id')
    })
    test('Should return 500 if delete throws', async () => {
        const { sut, dbDeleteModuleStub } = makeSut()
        jest.spyOn(dbDeleteModuleStub, 'delete').mockReturnValueOnce(
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
