import { AddMaterialModel } from '../../../domain/usecases/materials/add-material'
import { AddMaterialsRepository } from '../../protocols/db/materials/add-materials'
import { DbAddMaterials } from './db-add-materials'

interface SutTypes {
    sut: DbAddMaterials
    addMaterialsRepositoryStub: AddMaterialsRepository
}

const makeFakeRequest = () => ({
    title: 'any_title',
    url: 'any_url',
    order: 1,
    moduleId: 'any_id'
})

const makeAddMaterials = (): AddMaterialsRepository => {
    class AddMAterialsRepositoryStub implements AddMaterialsRepository {
        async add(params: AddMaterialModel): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new AddMAterialsRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addMaterialsRepositoryStub = makeAddMaterials()
    const sut = new DbAddMaterials(addMaterialsRepositoryStub)
    return {
        sut,
        addMaterialsRepositoryStub
    }
}

describe('DbAddMaterials', async () => {
    test('Should call addMaterials how correct values', async () => {
        const { sut, addMaterialsRepositoryStub } = makeSut()
        const spyAddMaterials = jest.spyOn(addMaterialsRepositoryStub, 'add')
        await sut.add(makeFakeRequest())
        expect(spyAddMaterials).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should return throws if addMaterials returns throw', async () => {
        const { sut, addMaterialsRepositoryStub } = makeSut()
        jest.spyOn(addMaterialsRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should addMaterials returns success', async () => {
        const { sut } = makeSut()
        const promise = await sut.add(makeFakeRequest())
        expect(promise).toBeNull()
    })
})
