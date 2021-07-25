import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { ClasseMysqlRepository } from '../../../../../infra/db/mysql/classe/classe-mysql-repository'
import { DbLoadClass } from '../../../../../data/usecases/classe/load-classe/db-load-classe'
import { LoadClassController } from '../../../../../presentation/controllers/classes/load-classes/load-classes-controller'

export const makeLoadClassesController = (): Controller => {
    const classeMysqlRepsitory = new ClasseMysqlRepository()
    const dbLoadClass = new DbLoadClass(classeMysqlRepsitory)
    const controller = new LoadClassController(dbLoadClass)
    return makeLogControllerDecorator(controller)
}
