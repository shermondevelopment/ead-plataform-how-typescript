import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { DisciplineMysqlRepository } from '../../../../../infra/db/mysql/discipline/discipline-mysql-repository'
import { LoadDisciplineController } from '../../../../../presentation/controllers/discipline/load-discipline/load-discipline-controller'
import { DbLoadDiscipline } from '../../../../../data/usecases/discipline/load/db-load-discipline'

export const makeLoadDisciplineController = (): Controller => {
    const disciplineMysqlRepository = new DisciplineMysqlRepository()
    const dbAddCourse = new DbLoadDiscipline(disciplineMysqlRepository)
    const controller = new LoadDisciplineController(dbAddCourse)
    return makeLogControllerDecorator(controller)
}
