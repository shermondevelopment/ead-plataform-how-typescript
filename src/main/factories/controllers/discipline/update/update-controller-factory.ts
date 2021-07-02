import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { DisciplineMysqlRepository } from '../../../../../infra/db/mysql/discipline/discipline-mysql-repository'
import { DbUpdateDiscipline } from '../../../../../data/usecases/discipline/update/db-update-discipline'
import { UpdateDisciplineController } from '../../../../../presentation/controllers/discipline/update-discipline/update-discipline-controller'

export const makeUpdateDisciplineController = (): Controller => {
    const disciplineRepository = new DisciplineMysqlRepository()
    const slug = new SlugIfyadapter()
    const updateDiscipline = new DbUpdateDiscipline(slug, disciplineRepository)
    const controller = new UpdateDisciplineController(updateDiscipline)
    return makeLogControllerDecorator(controller)
}
