import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { ClasseMysqlRepository } from '../../../../../infra/db/mysql/classe/classe-mysql-repository'
import { DbUpdateClasse } from '../../../../../data/usecases/classe/update-classe/db-update-classe'
import { UpdateClasseController } from '../../../../../presentation/controllers/classes/update-classes/update-classes-controller'

export const makeUpdateClasseController = (): Controller => {
    const slug = new SlugIfyadapter()
    const classeMysqlRepository = new ClasseMysqlRepository()
    const dbUpdateClasse = new DbUpdateClasse(slug, classeMysqlRepository)
    const controller = new UpdateClasseController(dbUpdateClasse)
    return makeLogControllerDecorator(controller)
}
