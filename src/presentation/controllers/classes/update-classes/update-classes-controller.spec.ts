import {
    AddClasseModel,
    ok,
    serverError,
    UpdateClasse
} from './update-classes-controller-protocols'
import { UpdateClasseController } from './update-classes-controller'

interface SutTypes {
    sut: UpdateClasseController
    updateClasseStub: UpdateClasse
}

const makeFakeRequest = () => ({
    body: {
        title: 'new title',
        url: 'new video',
        classeId: 'any_id'
    }
})

const makeUpdateClasse = (): UpdateClasse => {
    class UpdateClasseStub implements UpdateClasse {
        update(
            classeId: string,
            params: Partial<AddClasseModel>
        ): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new UpdateClasseStub()
}

const makeSut = (): SutTypes => {
    const updateClasseStub = makeUpdateClasse()
    const sut = new UpdateClasseController(updateClasseStub)
    return {
        sut,
        updateClasseStub
    }
}

describe('UpdateClasse Controller', () => {
    test('Should call updateClassStub how correct values', async () => {
        const { sut, updateClasseStub } = makeSut()
        const spyUpdateClass = jest.spyOn(updateClasseStub, 'update')
        await sut.handle(makeFakeRequest())
        expect(spyUpdateClass).toHaveBeenCalledWith(
            'any_id',
            makeFakeRequest().body
        )
    })
    test('Should return 500 if updateClassStub throws', async () => {
        const { sut, updateClasseStub } = makeSut()
        jest.spyOn(updateClasseStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if updateClassStub an success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(null))
    })
})
