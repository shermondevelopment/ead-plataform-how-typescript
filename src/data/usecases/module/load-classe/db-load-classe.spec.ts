import { LoadClassRepository } from '../../../protocols/db/module/load-class-from-module'
import { DbLoadClassFromModule } from './db-load-classe'

interface SutTypes {
    sut: DbLoadClassFromModule
    dbLoadClassStub: LoadClassRepository
}

const makeLoadClassRepository = (): LoadClassRepository => {
    class LoadClassRepositoryStub implements LoadClassRepository {
        async loadClass(idUser: string, moduleId: string): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new LoadClassRepositoryStub()
}

const makeSut = (): SutTypes => {
    const dbLoadClassStub = makeLoadClassRepository()
    const sut = new DbLoadClassFromModule(dbLoadClassStub)
    return {
        dbLoadClassStub,
        sut
    }
}

describe('DbLoadClass', () => {
    test('Should call dbLoadClass how correct values', async () => {
        const { sut, dbLoadClassStub } = makeSut()
        const spyLoadClass = jest.spyOn(dbLoadClassStub, 'loadClass')
        await sut.loadClass('any_id', 'any_id')
        expect(spyLoadClass).toHaveBeenCalledWith('any_id', 'any_id')
    })
    test('Should throws if dbLoadClass failed', async () => {
        const { sut, dbLoadClassStub } = makeSut()
        jest.spyOn(dbLoadClassStub, 'loadClass').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.loadClass('any_id', 'any_id')
        await expect(promise).rejects.toThrow()
    })
})
