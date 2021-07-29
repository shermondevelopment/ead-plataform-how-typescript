import {
    AddMaterial,
    AddMaterialModel
} from '../../../domain/usecases/materials/add-material'
import {
    ok,
    serverError
} from '../account/account-enable/account-active-controller-protocols'
import { AddMAterialController } from './add-material-controller'

interface SutTypes {
    addMaterialStub: AddMaterial
    sut: AddMAterialController
}

const makeFakeRequest = () => ({
    body: {
        title: 'any-title',
        figure: 'any_url',
        order: 1,
        moduleId: 'any_id'
    }
})

const makeAddMaterial = (): AddMaterial => {
    class AddMaterialStub implements AddMaterial {
        async add(params: AddMaterialModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddMaterialStub()
}

const makeSut = (): SutTypes => {
    const addMaterialStub = makeAddMaterial()
    const sut = new AddMAterialController(addMaterialStub)
    return {
        sut,
        addMaterialStub
    }
}

describe('AddMAterialsController', () => {
    test('Shoud call addMaterial how correct values', async () => {
        const { sut, addMaterialStub } = makeSut()
        const spyAddMaterial = jest.spyOn(addMaterialStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(spyAddMaterial).toHaveBeenCalledWith({
            title: 'any-title',
            url: 'any_url',
            order: 1,
            moduleId: 'any_id'
        })
    })
    test('Shoud return 500 if addMaterial failed', async () => {
        const { sut, addMaterialStub } = makeSut()
        jest.spyOn(addMaterialStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => {
                reject(new Error())
            })
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Shoud return 200 if addMaterial an success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(null))
    })
})
