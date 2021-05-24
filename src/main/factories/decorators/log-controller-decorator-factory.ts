import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMysqlRepository } from '../../../infra/db/mysql/log/log-mysql-repository'

export const makeLogControllerDecorator = (
    controller: Controller
): Controller => {
    const logMysqlRepository = new LogMysqlRepository()
    return new LogControllerDecorator(controller, logMysqlRepository)
}
