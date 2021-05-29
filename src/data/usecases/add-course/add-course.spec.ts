import { Slug } from '../../protocols/remodulate/slug'
import { DbAddCourse } from './add-course'

describe('DbAddCourse Usecase', () => {
    test('Should call Slug with correct value', async () => {
        class SlugStub implements Slug {
            transform(value: string): string {
                return 'any-value'
            }
        }
        const makeFakeRequest = {
            title: 'any_title',
            figure: 'any_value'
        }
        const slugStub = new SlugStub()
        const sut = new DbAddCourse(slugStub)
        const spySlug = jest.spyOn(slugStub, 'transform')
        await sut.add(makeFakeRequest)
        expect(spySlug).toHaveBeenCalledWith('any_title')
    })
})
