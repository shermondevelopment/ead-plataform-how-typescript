import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbDeleteModule } from '../../../../../data/usecases/module/delete-module/db-delete-module'
import { DeleteModuleController } from '../../../../../presentation/controllers/modules/delete-modules/delete-modules-controller'

export const makeDeleteModuleController = (): Controller => {
    const moduleRepository = new ModuleMysqlRepository()
    const dbDeleteModule = new DbDeleteModule(moduleRepository)
    const controller = new DeleteModuleController(dbDeleteModule)
    return makeLogControllerDecorator(controller)
}
