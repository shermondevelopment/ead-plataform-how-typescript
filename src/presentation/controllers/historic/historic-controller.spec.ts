import {
    AddHistoric,
    AddHistoricModel
} from '../../../domain/usecases/historic/add-historic'
import {
    ok,
    serverError
} from '../account/account-enable/account-active-controller-protocols'
import { AddHistoricController } from './historic-controller'

interface SutTypes {
    sut: AddHistoricController
    addHistoricStub: AddHistoric
}

const makeFakeRequest = () => ({
    accountId: 'any_id',
    body: {
        id_class: 'any_id',
        moduleId: 'any_id'
    }
})

const makeAddHistoric = (): AddHistoric => {
    class AddHistoricStub implements AddHistoric {
        async add(params: AddHistoricModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddHistoricStub()
}

const makeSut = (): SutTypes => {
    const addHistoricStub = makeAddHistoric()
    const sut = new AddHistoricController(addHistoricStub)
    return {
        sut,
        addHistoricStub
    }
}

describe('AddHistoric Controller', () => {
    test('Should call addHistoric how correct values', async () => {
        const { sut, addHistoricStub } = makeSut()
        const spyAdddHistoric = jest.spyOn(addHistoricStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(spyAdddHistoric).toHaveBeenCalledWith({
            ...makeFakeRequest().body,
            user_id: 'any_id'
        })
    })
    test('Should return 500 if addHistoric failed', async () => {
        const { sut, addHistoricStub } = makeSut()
        jest.spyOn(addHistoricStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if addHistoric success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(null))
    })
})
