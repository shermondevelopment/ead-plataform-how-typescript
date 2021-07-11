import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { DbAddDiscipline } from '../../../../../data/usecases/discipline/add/db-add-discipline'
import { DisciplineMysqlRepository } from '../../../../../infra/db/mysql/discipline/discipline-mysql-repository'
import { makeAddDisciplineValidation } from './discipline-validation-factory'
import { AddDisciplineController } from '../../../../../presentation/controllers/discipline/add-discipline/add-discipline-controller'

export const makeAddDisciplineController = (): Controller => {
    const slug = new SlugIfyadapter()
    const disciplineMysqlRepository = new DisciplineMysqlRepository()
    const dbAddDiscipline = new DbAddDiscipline(slug, disciplineMysqlRepository)
    const controller = new AddDisciplineController(
        makeAddDisciplineValidation(),
        dbAddDiscipline
    )
    return makeLogControllerDecorator(controller)
}
