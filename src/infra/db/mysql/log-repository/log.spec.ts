import { Repository } from 'typeorm'
import Errors from '../entity/errors'
import { MysqlHelper } from '../helpers/mysql-helper'
import { LogMysqlRepository } from './log'

const makeSut = (): LogMysqlRepository => {
    return new LogMysqlRepository()
}

describe('Log Mysql Repository', () => {
    let errorRepository: Repository<Errors>

    beforeAll(async () => {
        await MysqlHelper.connect()
    })

    afterAll(async () => {
        await MysqlHelper.disconnect()
    })

    beforeEach(async () => {
        errorRepository = MysqlHelper.getRepository(Errors)
        await errorRepository.delete({ stack: 'any_error' })
    })
    test('Should create an error log on success', async () => {
        const sut = makeSut()
        await sut.logError('any_error')
        const count = await errorRepository.count()
        expect(count).toBe(1)
    })
})
