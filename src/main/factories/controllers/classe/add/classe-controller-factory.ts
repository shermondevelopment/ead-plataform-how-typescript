import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { makeAddClasseValidation } from './classe-validation-factory'
import { ClasseMysqlRepository } from '../../../../../infra/db/mysql/classe/classe-mysql-repository'
import { AddClassesController } from '../../../../../presentation/controllers/classes/add-classes/add-classe-controller'
import { DbAddClasse } from '../../../../../data/usecases/classe/add-classe/db-add-classe'

export const makeAddClasseController = (): Controller => {
    const slug = new SlugIfyadapter()
    const classeMysqlRepository = new ClasseMysqlRepository()
    const dbAddClasse = new DbAddClasse(slug, classeMysqlRepository)
    const controller = new AddClassesController(
        makeAddClasseValidation(),
        dbAddClasse
    )
    return makeLogControllerDecorator(controller)
}
