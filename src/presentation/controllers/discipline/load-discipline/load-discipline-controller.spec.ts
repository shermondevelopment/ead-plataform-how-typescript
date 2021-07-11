import { LoadDiscipline } from '../../../../domain/usecases/discipline/load/load-discipline'
import {
    DisciplineModel,
    ok,
    serverError
} from '../add-discipline/add-discipline-controller-protocols'
import { LoadDisciplineController } from './load-discipline-controller'

interface SutTypes {
    sut: LoadDisciplineController
    loadDisciplineStub: LoadDiscipline
}

const makeFakeResponse = () => [
    {
        id: 'any_id',
        title: 'any title',
        slug: 'any-slug',
        qt_modules: 13,
        courseId: 'any_id'
    }
]

const makeFakeRequest = () => ({
    query: {}
})

const makeLoadDiscipline = (): LoadDiscipline => {
    class LoadDisciplineStub implements LoadDiscipline {
        async load(): Promise<Array<DisciplineModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadDisciplineStub()
}

const makeSut = (): SutTypes => {
    const loadDisciplineStub = makeLoadDiscipline()
    const sut = new LoadDisciplineController(loadDisciplineStub)
    return {
        sut,
        loadDisciplineStub
    }
}

describe('LoadDiscipline Controller', () => {
    test('Should return 500 if loadDiscipline throw', async () => {
        const { sut, loadDisciplineStub } = makeSut()
        jest.spyOn(loadDisciplineStub, 'load').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if loadDiscipline return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeResponse()))
    })
})
