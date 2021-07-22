import {
    AddProgressRepository,
    AddProgressModel
} from './db-add-progress-protocols'
import { DbAddProgress } from './db-add-progress'

interface SutTypes {
    sut: DbAddProgress
    addProgressStub: AddProgressRepository
}

const makeFakeRequest = () => ({
    user_id: 'any_id',
    totalItems: 0,
    completedItems: 0,
    moduleId: 'any_id'
})

const makeAddProgress = (): AddProgressRepository => {
    class AddProgressStub implements AddProgressRepository {
        async add(params: AddProgressModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddProgressStub()
}

const makeSut = (): SutTypes => {
    const addProgressStub = makeAddProgress()
    const sut = new DbAddProgress(addProgressStub)
    return {
        sut,
        addProgressStub
    }
}

describe('DbAddProgress', () => {
    test('Should call addProgressRepository how correct values', async () => {
        const { sut, addProgressStub } = makeSut()
        const sptAddProgress = jest.spyOn(addProgressStub, 'add')
        await sut.add(makeFakeRequest())
        expect(sptAddProgress).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should return throws if AddProgressRepository return throws', async () => {
        const { sut, addProgressStub } = makeSut()
        jest.spyOn(addProgressStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return AddProgressRepository return success', async () => {
        const { sut } = makeSut()
        const response = await sut.add(makeFakeRequest())
        expect(response).toBeNull()
    })
})
