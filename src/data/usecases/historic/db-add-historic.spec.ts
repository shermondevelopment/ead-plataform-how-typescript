import { AddHistoricModel } from '../../../domain/usecases/historic/add-historic'
import { AddHistoricRepository } from '../../protocols/db/historic/add-historic'
import { DbAddHistoric } from './db-add-historic'

interface SutTypes {
    sut: DbAddHistoric
    addHistoricRepository: AddHistoricRepository
}

const makeFakeRequest = () => ({
    user_id: 'any_id',
    id_class: 'any_id',
    moduleId: 'any_id'
})

const makeAddHistoric = (): AddHistoricRepository => {
    class AddHistoricRepositoryStub implements AddHistoricRepository {
        async add(params: AddHistoricModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddHistoricRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addHistoricRepository = makeAddHistoric()
    const sut = new DbAddHistoric(addHistoricRepository)
    return {
        sut,
        addHistoricRepository
    }
}

describe('DbAddHistoric', () => {
    test('Should call addHistoric how correct values', async () => {
        const { sut, addHistoricRepository } = makeSut()
        const spyAddHistoric = jest.spyOn(addHistoricRepository, 'add')
        await sut.add(makeFakeRequest())
        expect(spyAddHistoric).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should return throws if addHistoric failed', async () => {
        const { sut, addHistoricRepository } = makeSut()
        jest.spyOn(addHistoricRepository, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return null if addHistoric success', async () => {
        const { sut } = makeSut()
        const promise = await sut.add(makeFakeRequest())
        expect(promise).toBeNull()
    })
})
