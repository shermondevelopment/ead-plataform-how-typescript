import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbLoadProgress } from '../../../../../data/usecases/module/load-progress/db-load-progress-module'
import { LoadProgressController } from '../../../../../presentation/controllers/modules/load-progress/load-progress-controller'

export const makeLoadProgressController = (): Controller => {
    const moduleMysqlRepository = new ModuleMysqlRepository()
    const dbLoadProgressModule = new DbLoadProgress(moduleMysqlRepository)
    const controller = new LoadProgressController(dbLoadProgressModule)
    return makeLogControllerDecorator(controller)
}
