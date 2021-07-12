import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbLoadModule } from '../../../../../data/usecases/module/load-module/db-load-module'
import { LoadModuleController } from '../../../../../presentation/controllers/modules/load-modules/load-module-controller'

export const makeLoadModuleController = (): Controller => {
    const moduleMysqlRepository = new ModuleMysqlRepository()
    const dbLoadCourse = new DbLoadModule(moduleMysqlRepository)
    const controller = new LoadModuleController(dbLoadCourse)
    return makeLogControllerDecorator(controller)
}
