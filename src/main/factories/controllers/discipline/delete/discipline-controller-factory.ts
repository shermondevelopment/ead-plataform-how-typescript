import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { DbDeleteDiscipline } from '../../../../../data/usecases/discipline/delete/db-delete-discipline'
import { DisciplineMysqlRepository } from '../../../../../infra/db/mysql/discipline/discipline-mysql-repository'
import { DeleteDisciplineController } from '../../../../../presentation/controllers/discipline/delete-discipline/delete-discipline'

export const makeDeleteDisciplineController = (): Controller => {
    const disciplineRepository = new DisciplineMysqlRepository()
    const dbDeleteDiscipline = new DbDeleteDiscipline(disciplineRepository)
    const controller = new DeleteDisciplineController(dbDeleteDiscipline)
    return makeLogControllerDecorator(controller)
}
