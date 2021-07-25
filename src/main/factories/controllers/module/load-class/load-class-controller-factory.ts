import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbLoadClassFromModule } from '../../../../../data/usecases/module/load-classe/db-load-classe'
import { LoadClassFromModuleController } from '../../../../../presentation/controllers/modules/module-class/load-module-class-controller'

export const makeLoadClassController = (): Controller => {
    const moduleMysqlRepository = new ModuleMysqlRepository()
    const dbLoadClassModule = new DbLoadClassFromModule(moduleMysqlRepository)
    const controller = new LoadClassFromModuleController(dbLoadClassModule)
    return makeLogControllerDecorator(controller)
}
