import Course from '../entity/courses'
import { MysqlHelper } from '../helpers/mysql-helper'
import { CourseMysqlRepository } from './course-mysql-repository'

const makeSut = (): CourseMysqlRepository => {
    return new CourseMysqlRepository()
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
})