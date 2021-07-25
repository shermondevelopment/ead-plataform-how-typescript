import { ok, serverError, LoadClass } from './load-classes-controller-protocols'
import { LoadClassController } from './load-classes-controller'

interface SutTypes {
    sut: LoadClassController
    loadClassStub: LoadClass
}

const makeFakeRequest = () => ({
    accountId: 'any_id',
    params: {
        id: 'any_id'
    }
})

const makeLoadClasse = (): LoadClass => {
    class LoadClassStub implements LoadClass {
        async load(userId: string, moduleId: string): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new LoadClassStub()
}

const makeSut = (): SutTypes => {
    const loadClassStub = makeLoadClasse()
    const sut = new LoadClassController(loadClassStub)
    return {
        sut,
        loadClassStub
    }
}

describe('LoadClass Controller', () => {
    test('Should call loadClassesStub how correct values', async () => {
        const { sut, loadClassStub } = makeSut()
        const spyLoadClass = jest.spyOn(loadClassStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(spyLoadClass).toHaveBeenCalledWith('any_id', 'any_id')
    })
    test('Should return 500 if loadClassesStub failed', async () => {
        const { sut, loadClassStub } = makeSut()
        jest.spyOn(loadClassStub, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if loadClassesStub on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(null))
    })
})
