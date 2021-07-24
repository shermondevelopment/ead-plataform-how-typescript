import { UpdateClasseRepository } from '../../../protocols/db/classe/update-classe'
import {
    AddClasseModel,
    AddClasseModelRepository,
    Slug
} from '../add-classe/db-add-classe-protocols'
import { DbUpdateClasse } from './db-update-classe'

interface SutTypes {
    sut: DbUpdateClasse
    slugStub: Slug
    updateClasseRepositoryStub: UpdateClasseRepository
}

const makeFakeRequest = (): Partial<AddClasseModel> => ({
    title: 'any title',
    url: 'new url'
})

const makeUpdateClasse = (): UpdateClasseRepository => {
    class UpdateClasseRepositoryStub implements UpdateClasseRepository {
        update(
            idClasse: string,
            params: Partial<AddClasseModelRepository>
        ): Promise<any> {
            return new Promise((resolved) => resolved(null))
        }
    }
    return new UpdateClasseRepositoryStub()
}

const makeSlug = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'any-title'
        }
    }
    return new SlugStub()
}

const makeSut = (): SutTypes => {
    const slugStub = makeSlug()
    const updateClasseRepositoryStub = makeUpdateClasse()
    const sut = new DbUpdateClasse(slugStub, updateClasseRepositoryStub)
    return {
        sut,
        updateClasseRepositoryStub,
        slugStub
    }
}

describe('DbUpdateClasse', () => {
    test('Should call slug if title is given', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.update('any_id', makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any title')
    })
    test('Should call updateClasseRepositoryStub how correct values', async () => {
        const { sut, updateClasseRepositoryStub } = makeSut()
        const spyUpdateClasse = jest.spyOn(updateClasseRepositoryStub, 'update')
        await sut.update('any_id', makeFakeRequest())
        expect(spyUpdateClasse).toHaveBeenCalledWith('any_id', {
            ...makeFakeRequest(),
            slug: 'any-title'
        })
    })
    test('Should call updateClasseRepositoryStub without title', async () => {
        const { sut, updateClasseRepositoryStub } = makeSut()
        const spyUpdateClasse = jest.spyOn(updateClasseRepositoryStub, 'update')
        await sut.update('any_id', { url: 'new url' })
        expect(spyUpdateClasse).toHaveBeenCalledWith('any_id', {
            url: 'new url'
        })
    })
    test('Should return throws if updateClasseRepositoryStub failed', async () => {
        const { sut, updateClasseRepositoryStub } = makeSut()
        jest.spyOn(updateClasseRepositoryStub, 'update').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.update('any_id', { url: 'new url' })
        await expect(promise).rejects.toThrow()
    })
})
