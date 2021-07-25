import { LoadClassFromModule } from '../../../../domain/usecases/module/load-class-from-module'
import { serverError } from '../add-modules/add-modules-controller-protocols'
import { LoadClassFromModuleController } from './load-module-class-controller'

interface SutTypes {
    sut: LoadClassFromModuleController
    loadClassStub: LoadClassFromModule
}

const makeFakeRequest = () => ({
    accountId: 'any_id',
    params: {
        id: 'any_id'
    }
})

const makeLoadClass = (): LoadClassFromModule => {
    class LoadClassFromModuleStub implements LoadClassFromModule {
        async loadClass(idUser: string, moduleId: string): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new LoadClassFromModuleStub()
}

const makeSut = (): SutTypes => {
    const loadClassStub = makeLoadClass()
    const sut = new LoadClassFromModuleController(loadClassStub)
    return {
        sut,
        loadClassStub
    }
}

describe('load lessons from module', async () => {
    test('Should call loadClasse how correct values', async () => {
        const { sut, loadClassStub } = makeSut()
        const spyLoadClassStub = jest.spyOn(loadClassStub, 'loadClass')
        await sut.handle(makeFakeRequest())
        expect(spyLoadClassStub).toHaveBeenCalledWith('any_id', 'any_id')
    })
    test('Should return 500 if loadClasse throws', async () => {
        const { sut, loadClassStub } = makeSut()
        jest.spyOn(loadClassStub, 'loadClass').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
