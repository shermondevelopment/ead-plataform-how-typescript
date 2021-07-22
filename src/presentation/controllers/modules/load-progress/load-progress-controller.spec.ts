import {
    ok,
    serverError,
    LoadProgressResponse,
    LoadProgress,
    LoadProgressRequest
} from './load-progress-controller-protocols'
import { LoadProgressController } from './load-progress-controller'

interface SutTypes {
    sut: LoadProgressController
    loadProgressStub: LoadProgress
}

const makeFakeRequest = () => ({
    accountId: 'any_id',
    query: {
        disciplineId: 'any_id'
    }
})

const makeFakeResponse = () => ({
    qt_modules: 0,
    qt_concluded: 0,
    percentu: 0
})

const makeLoadProgress = (): LoadProgress => {
    class LoadProgressStub implements LoadProgress {
        async load(
            loadParams: LoadProgressRequest
        ): Promise<LoadProgressResponse> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadProgressStub()
}

const makeSut = (): SutTypes => {
    const loadProgressStub = makeLoadProgress()
    const sut = new LoadProgressController(loadProgressStub)
    return {
        loadProgressStub,
        sut
    }
}

describe('LoadProgress Controller', () => {
    test('Should call LoadProgress how correct values', async () => {
        const { sut, loadProgressStub } = makeSut()
        const spyLoadProgress = jest.spyOn(loadProgressStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(spyLoadProgress).toHaveBeenCalledWith({
            user_id: 'any_id',
            disciplineId: 'any_id'
        })
    })
    test('Should return 500  if LoadProgress throws', async () => {
        const { sut, loadProgressStub } = makeSut()
        jest.spyOn(loadProgressStub, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200  if LoadProgress success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeResponse()))
    })
})
