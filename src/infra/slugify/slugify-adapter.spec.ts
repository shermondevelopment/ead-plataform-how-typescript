import { SlugIfyadapter } from './slugify-adapter'

const makeSut = () => {
    return new SlugIfyadapter()
}

describe('slugify', () => {
    test('Should return slugify with correct value', async () => {
        const sut = makeSut()
        const slug = sut.transform('any value')
        expect(slug).toEqual('any-value')
    })
})
