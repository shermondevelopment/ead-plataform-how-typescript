import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ClasseMysqlRepository } from '../../../../../infra/db/mysql/classe/classe-mysql-repository'
import { DbDeleteClass } from '../../../../../data/usecases/classe/delete-classe/db-delete-classe'
import { DeleteClasseController } from '../../../../../presentation/controllers/classes/delete-classes/delete-classe-controller'

export const makeDeletedClasseController = (): Controller => {
    const classeMysqlRepository = new ClasseMysqlRepository()
    const dbDeleteClasse = new DbDeleteClass(classeMysqlRepository)
    const controller = new DeleteClasseController(dbDeleteClasse)
    return makeLogControllerDecorator(controller)
}
