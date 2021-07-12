import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { ModuleMysqlRepository } from '../../../../../infra/db/mysql/modules/module-mysql-repository'
import { DbUpdateModule } from '../../../../../data/usecases/module/update-module/db-update-module'
import { UpdateModuleController } from '../../../../../presentation/controllers/modules/update-modules/update-module-controller'

export const makeUpdateModuleController = (): Controller => {
    const moduleRepository = new ModuleMysqlRepository()
    const slug = new SlugIfyadapter()
    const updateModule = new DbUpdateModule(slug, moduleRepository)
    const controller = new UpdateModuleController(updateModule)
    return makeLogControllerDecorator(controller)
}
