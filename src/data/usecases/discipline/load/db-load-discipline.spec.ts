import {
    LoadDisciplineRepository,
    DisciplineModel
} from './db-load-discipline.protocols'
import { DbLoadDiscipline } from './db-load-discipline'

interface SutTypes {
    sut: DbLoadDiscipline
    loadDisciplineRepository: LoadDisciplineRepository
}

const makeFakeResponse = () => [
    {
        id: 'any_id',
        title: 'any title',
        slug: 'any-slug'
    }
]

const makeLoadDisciplineRepository = (): LoadDisciplineRepository => {
    class LoadDisciplineRepositoryStub implements LoadDisciplineRepository {
        async load(): Promise<Array<DisciplineModel>> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new LoadDisciplineRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadDisciplineRepository = makeLoadDisciplineRepository()
    const sut = new DbLoadDiscipline(loadDisciplineRepository)
    return {
        sut,
        loadDisciplineRepository
    }
}

describe('Load Disciplines', () => {
    test('Should return throw if loadDisciplineRepository throws', async () => {
        const { sut, loadDisciplineRepository } = makeSut()
        jest.spyOn(loadDisciplineRepository, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const discipline = sut.load()
        await expect(discipline).rejects.toThrow()
    })
    test('Should return an courses if on success', async () => {
        const { sut } = makeSut()
        const courses = await sut.load()
        expect(courses).toEqual(makeFakeResponse())
    })
})
