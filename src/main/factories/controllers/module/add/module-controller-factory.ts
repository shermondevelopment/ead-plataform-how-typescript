import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbAddModule } from '../../../../../data/usecases/module/add-module/db-add-module'
import { AddModulesController } from '../../../../../presentation/controllers/modules/add-modules/add-modules-controller'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { makeAddModuleValidation } from './module-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { Controller } from '../../../../../presentation/protocols'

export const makeAddModuleController = (): Controller => {
    const slug = new SlugIfyadapter()
    const moduleMysqlRepository = new ModuleMysqlRepository()
    const dbAddModule = new DbAddModule(slug, moduleMysqlRepository)
    const controller = new AddModulesController(
        makeAddModuleValidation(),
        dbAddModule
    )
    return makeLogControllerDecorator(controller)
}
