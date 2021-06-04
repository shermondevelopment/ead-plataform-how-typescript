import Course from '../entity/courses'
import { MysqlHelper } from '../helpers/mysql-helper'
import { CourseMysqlRepository } from './course-mysql-repository'

const makeSut = (): CourseMysqlRepository => {
    return new CourseMysqlRepository()
}

const makeFakeResponse = {
    id: 'valid_id',
    title: 'valid_title',
    figure: 'valid_figure',
    slug: 'valid-slug'
}

describe('Course Repository', () => {
    beforeAll(async () => {
        await MysqlHelper.connect()
    })
    afterAll(async () => {
        await MysqlHelper.disconnect()
    })

    beforeEach(async () => {
        const courseRepository = MysqlHelper.getRepository(Course)
        await courseRepository.delete({ figure: 'valid_figure' })
    })

    test('Should return an course on add success', async () => {
        const sut = makeSut()
        const course = await sut.add({
            title: 'valid_title',
            figure: 'valid_figure',
            slug: 'valid-slug'
        })
        expect(course).toBeTruthy()
        expect(course.id).toBeTruthy()
        expect(course.title).toBeTruthy()
        expect(course.slug).toBeTruthy()
        expect(course.figure).toBeTruthy()
    })
    test('Should retun an courses on list success', async () => {
        const sut = makeSut()
        await sut.add({
            title: 'valid_title',
            figure: 'valid_figure',
            slug: 'valid-slug'
        })
        const course = await sut.load({
            search: '',
            page: 0
        })
        expect(course).toBeTruthy()
        expect(course.next).toEqual(false)
    })
})
