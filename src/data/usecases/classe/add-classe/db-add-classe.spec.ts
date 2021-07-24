import {
    AddClasseRepository,
    AddClasseModelRepository,
    Slug,
    ClasseModel
} from './db-add-classe-protocols'
import { DbAddClasse } from './db-add-classe'

interface SutTypes {
    sut: DbAddClasse
    slugStub: Slug
    addClasseRepositoryStub: AddClasseRepository
}

const makeFakeRequest = () => ({
    title: 'any title',
    order: 0,
    url: 'any_url',
    moduleId: 'any_id'
})

const makeFakeResponse = () => ({
    id: 'any_id',
    title: 'any title',
    slug: 'any-title',
    order: 0,
    url: 'any_url',
    moduleId: 'any_id'
})

const makeSlug = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'any-title'
        }
    }
    return new SlugStub()
}

const makeAddClasseRepository = (): AddClasseRepository => {
    class AddClassRepository implements AddClasseRepository {
        async add(params: AddClasseModelRepository): Promise<ClasseModel> {
            return new Promise((resolved) => resolved(makeFakeResponse()))
        }
    }
    return new AddClassRepository()
}

const makeSut = (): SutTypes => {
    const slugStub = makeSlug()
    const addClasseRepositoryStub = makeAddClasseRepository()
    const sut = new DbAddClasse(slugStub, addClasseRepositoryStub)
    return {
        sut,
        slugStub,
        addClasseRepositoryStub
    }
}

describe('DbAddClasse', () => {
    test('Should call SlugStub how correct values', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any title')
    })
    test('Should throw if Slug return throws', async () => {
        const { sut, slugStub } = makeSut()
        jest.spyOn(slugStub, 'transform').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = sut.add(makeFakeRequest())
        await expect(httpResponse).rejects.toThrow()
    })
    test('Should call addClasseRepository how correct values', async () => {
        const { sut, addClasseRepositoryStub } = makeSut()
        const spyAddClasse = jest.spyOn(addClasseRepositoryStub, 'add')
        await sut.add(makeFakeRequest())
        expect(spyAddClasse).toHaveBeenCalledWith({
            ...makeFakeRequest(),
            slug: 'any-title'
        })
    })
    test('Should return throws if addClasseRepository failed', async () => {
        const { sut, addClasseRepositoryStub } = makeSut()
        jest.spyOn(addClasseRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    test('Should return throws if addClasseRepository failed', async () => {
        const { sut } = makeSut()
        const promise = await sut.add(makeFakeRequest())
        await expect(promise).toEqual(makeFakeResponse())
    })
})
