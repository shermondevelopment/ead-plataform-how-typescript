import { LoadClassesRepository } from '../../../protocols/db/classe/load-classe'
import { DbLoadClass } from './db-load-classe'

interface SutTypes {
    sut: DbLoadClass
    loadClassRepositoryStub: LoadClassesRepository
}

const makeLoadClassRepository = (): LoadClassesRepository => {
    class LoadClassRepositoryStub implements LoadClassesRepository {
        async loadClass(idUser: string, moduleId: string): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new LoadClassRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadClassRepositoryStub = makeLoadClassRepository()
    const sut = new DbLoadClass(loadClassRepositoryStub)
    return {
        loadClassRepositoryStub,
        sut
    }
}

describe('DbLoadClass', () => {
    test('Should call loadClassRepository how correct values', async () => {
        const { sut, loadClassRepositoryStub } = makeSut()
        const spyLoadClass = jest.spyOn(loadClassRepositoryStub, 'loadClass')
        await sut.load('any_id', 'any_id')
        expect(spyLoadClass).toHaveBeenCalledWith('any_id', 'any_id')
    })
    test('Should return throws if loadClassRepository failed', async () => {
        const { sut, loadClassRepositoryStub } = makeSut()
        jest.spyOn(loadClassRepositoryStub, 'loadClass').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.load('any_id', 'any_id')
        await expect(promise).rejects.toThrow()
    })
})
