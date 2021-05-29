import { AddCourse } from '../../../domain/usecases/add-course/add-course'
import { Slug } from '../../protocols/remodulate/slug'
import { DbAddCourse } from './add-course'

interface SutTypes {
    sut: AddCourse
    slugStub: Slug
}

const makeFakeRequest = () => ({
    title: 'any_title',
    figure: 'any_value'
})

const makeSlugStub = (): Slug => {
    class SlugStub implements Slug {
        transform(value: string): string {
            return 'any-value'
        }
    }
    return new SlugStub()
}

const makeSut = (): SutTypes => {
    const slugStub = makeSlugStub()
    const sut = new DbAddCourse(slugStub)
    return {
        sut,
        slugStub
    }
}

describe('DbAddCourse Usecase', () => {
    test('Should call Slug with correct value', async () => {
        const { sut, slugStub } = makeSut()
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest())
        expect(spySlug).toHaveBeenCalledWith('any_title')
    })
})
