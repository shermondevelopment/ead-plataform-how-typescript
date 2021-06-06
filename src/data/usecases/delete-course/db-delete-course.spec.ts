import {
    DeleteRepository,
    ReturnDelete,
    DeleteParam
} from './db-delete-course-protocols'
import { DbDeleteCourse } from './db-delete-course'

interface SutTypes {
    sut: DbDeleteCourse
    dbDeleteRepositoryStub: DeleteRepository
}

const makeDbDeleteRepositoryStub = (): DeleteRepository => {
    class DbDeleteRepository implements DeleteRepository {
        async delete(param: DeleteParam): Promise<ReturnDelete> {
            return new Promise((resolved) => resolved({ delete: true }))
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
        await sut.delete({ id: 'any_id' })
        expect(spyDelete).toHaveBeenCalledWith({
            id: 'any_id'
        })
    })
    test('Should throw if DbDeleteRepository throws', async () => {
        const { sut, dbDeleteRepositoryStub } = makeSut()
        jest.spyOn(dbDeleteRepositoryStub, 'delete').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.delete({ id: 'any_id' })
        await expect(promise).rejects.toThrow()
    })
    test('Should return an delete if on success', async () => {
        const { sut } = makeSut()
        const response = await sut.delete({ id: 'any_id' })
        expect(response).toEqual({ delete: true })
    })
})
