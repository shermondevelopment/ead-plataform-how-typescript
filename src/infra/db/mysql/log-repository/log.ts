import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import Errors from '../entity/errors'
import { MysqlHelper } from '../helpers/mysql-helper'

export class LogMysqlRepository implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        const errorRepository = MysqlHelper.getRepository(Errors)
        const errors = errorRepository.create({ stack, date: new Date() })
        await errorRepository.save(errors)
    }
}
