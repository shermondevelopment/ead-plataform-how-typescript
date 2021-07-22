import {
    LoadProgressRepository,
    LoadProgressResponse,
    LoadProgressRequest
} from './db-load-progress-module-protocols'
import { DbLoadProgress } from './db-load-progress-module'

interface SutTypes {
    sut: DbLoadProgress
    loadProgressStub: LoadProgressRepository
}

const makeFakeRequest = () => ({
    user_id: 'any_id',
    disciplineId: 'any_id'
})

const makeFakeResponse = () => ({
    qt_modules: 0,
    qt_concluded: 0,
    percentu: 0
})

const makeLoadProgress = (): LoadProgressRepository => {
    class LoadProgressRepositoryStub implements LoadProgressRepository {
        async loadProgress(
            paramsLoad: LoadProgressRequest
        ): Promise<LoadProgressResponse> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadProgressRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadProgressStub = makeLoadProgress()
    const sut = new DbLoadProgress(loadProgressStub)
    return {
        sut,
        loadProgressStub
    }
}

describe('DbLoadProgress', () => {
    test('Should call dbLoadProgressRepository how values', async () => {
        const { sut, loadProgressStub } = makeSut()
        const spyLoadProgress = jest.spyOn(loadProgressStub, 'loadProgress')
        await sut.load(makeFakeRequest())
        expect(spyLoadProgress).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should return throws if dbLoadProgressRepository throws', async () => {
        const { sut, loadProgressStub } = makeSut()
        jest.spyOn(loadProgressStub, 'loadProgress').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.load(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return success if dbLoadProgressRepository success', async () => {
        const { sut } = makeSut()
        const promise = await sut.load(makeFakeRequest())
        expect(promise).toEqual(makeFakeResponse())
    })
})
