import {
    Delete,
    HttpRequest,
    ok,
    serverError
} from './delete-controller-protocols'
import { DeleteDisciplineController } from './delete-discipline'

interface SutTypes {
    sut: DeleteDisciplineController
    dbDeleteDiscipline: Delete
}

const makeFakeDeleteCourse = () => {
    class DbDeleteDiscipline implements Delete {
        async delete(id: string): Promise<any> {
            return new Promise((resolved) => resolved({ deleted: true }))
        }
    }
    return new DbDeleteDiscipline()
}

const makeSut = (): SutTypes => {
    const dbDeleteDiscipline = makeFakeDeleteCourse()
    const sut = new DeleteDisciplineController(dbDeleteDiscipline)
    return {
        sut,
        dbDeleteDiscipline
    }
}

const makeFakeRequest = (): HttpRequest => ({
    params: {
        id: 'any_id'
    }
})

describe('DeleteDiscipline Controller', () => {
    test('Should call delete with correct values', async () => {
        const { sut, dbDeleteDiscipline } = makeSut()
        const spyDelete = jest.spyOn(dbDeleteDiscipline, 'delete')
        await sut.handle(makeFakeRequest())
        expect(spyDelete).toHaveBeenCalledWith('any_id')
    })
    test('Should return 500 if delete throws', async () => {
        const { sut, dbDeleteDiscipline } = makeSut()
        jest.spyOn(dbDeleteDiscipline, 'delete').mockReturnValueOnce(
            new Promise((resolv, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if delete an success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ deleted: true }))
    })
})
