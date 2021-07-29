import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { Controller } from '../../../../presentation/protocols'
import { MaterialsMysqlRepository } from '../../../../infra/db/mysql/materials/materials-mysql-repository'
import { DbAddMaterials } from '../../../../data/usecases/materials/db-add-materials'
import { AddMAterialController } from '../../../../presentation/controllers/materials/add-material-controller'

export const makeAddMaterialsController = (): Controller => {
    const materialsMysqlRepository = new MaterialsMysqlRepository()
    const dbAddModule = new DbAddMaterials(materialsMysqlRepository)
    const controller = new AddMAterialController(dbAddModule)
    return makeLogControllerDecorator(controller)
}
