import { DeleteRepository } from '../../course/delete-course/db-delete-course-protocols'
import { DbDeleteClass } from './db-delete-classe'

interface SutTypes {
    sut: DbDeleteClass
    dbDeleteRepositoryStub: DeleteRepository
}

const makeDbDeleteRepositoryStub = (): DeleteRepository => {
    class DbDeleteRepository implements DeleteRepository {
        async delete(id: string): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new DbDeleteRepository()
}

const makeSut = (): SutTypes => {
    const dbDeleteRepositoryStub = makeDbDeleteRepositoryStub()
    const sut = new DbDeleteClass(dbDeleteRepositoryStub)
    return {
        sut,
        dbDeleteRepositoryStub
    }
}

describe('DbDelete Class', async () => {
    test('Should call dbDeleteRepository how correct values', async () => {
        const { sut, dbDeleteRepositoryStub } = makeSut()
        const spyDbDelete = jest.spyOn(dbDeleteRepositoryStub, 'delete')
        await sut.delete('any_id')
        expect(spyDbDelete).toHaveBeenCalledWith('any_id')
    })
    test('Should throw if DbDeleteRepository throws', async () => {
        const { sut, dbDeleteRepositoryStub } = makeSut()
        jest.spyOn(dbDeleteRepositoryStub, 'delete').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.delete('any_id')
        await expect(promise).rejects.toThrow()
    })
    test('Should DbDeleteRepository return success', async () => {
        const { sut } = makeSut()
        const promise = await sut.delete('any_id')
        await expect(promise).toBeNull()
    })
})
