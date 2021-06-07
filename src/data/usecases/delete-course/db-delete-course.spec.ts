import { DeleteRepository } from './db-delete-course-protocols'
import { DbDeleteCourse } from './db-delete-course'

interface SutTypes {
    sut: DbDeleteCourse
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
    const sut = new DbDeleteCourse(dbDeleteRepositoryStub)
    return {
        sut,
        dbDeleteRepositoryStub
    }
}

describe('DbDeleteCourse', () => {
    test('Should call DbDeleteRepository how correct values', async () => {
        const { sut, dbDeleteRepositoryStub } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteRepositoryStub, 'delete')
        await sut.delete('any_id')
        expect(spyDelete).toHaveBeenCalledWith('any_id')
    })
    test('Should throw if DbDeleteRepository throws', async () => {
        const { sut, dbDeleteRepositoryStub } = makeSut()
        jest.spyOn(dbDeleteRepositoryStub, 'delete').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.delete('any_id')
        await expect(promise).rejects.toThrow()
    })
})
