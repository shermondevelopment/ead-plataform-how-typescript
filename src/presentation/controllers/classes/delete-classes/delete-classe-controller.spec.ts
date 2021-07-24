import {
    ok,
    serverError,
    Delete,
    HttpRequest
} from './delete-classe-controller-protocols'
import { DeleteClasseController } from './delete-classe-controller'

interface SutTypes {
    sut: DeleteClasseController
    dbDeleteClasse: Delete
}

const makeFakeDeleteClass = () => {
    class DeleteClasse implements Delete {
        async delete(id: string): Promise<any> {
            return new Promise((resolved) => resolved({ deleted: true }))
        }
    }
    return new DeleteClasse()
}

const makeSut = (): SutTypes => {
    const dbDeleteClasse = makeFakeDeleteClass()
    const sut = new DeleteClasseController(dbDeleteClasse)
    return {
        sut,
        dbDeleteClasse
    }
}

const makeFakeRequest = (): HttpRequest => ({
    params: {
        id: 'any_id'
    }
})

describe('DeleteClasse Controller', () => {
    test('Should call delete how correct values', async () => {
        const { sut, dbDeleteClasse } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteClasse, 'delete')
        await sut.handle(makeFakeRequest())
        expect(spyDelete).toHaveBeenCalledWith('any_id')
    })
    test('Should return 500 if delete failed', async () => {
        const { sut, dbDeleteClasse } = makeSut()
        jest.spyOn(dbDeleteClasse, 'delete').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if delete success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ deleted: true }))
    })
})
