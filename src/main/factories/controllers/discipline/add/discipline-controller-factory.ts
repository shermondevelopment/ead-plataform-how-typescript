import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddCourseController } from '../../../../../presentation/controllers/course/add-course/course-controller'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { DbAddDiscipline } from '../../../../../data/usecases/discipline/add/db-add-discipline'
import { DisciplineMysqlRepository } from '../../../../../infra/db/mysql/discipline/discipline-mysql-repository'
import { makeAddDisciplineValidation } from './discipline-validation-factory'

export const makeAddDisciplineController = (): Controller => {
    const slug = new SlugIfyadapter()
    const disciplineMysqlRepository = new DisciplineMysqlRepository()
    const dbAddCourse = new DbAddDiscipline(slug, disciplineMysqlRepository)
    const controller = new AddCourseController(
        makeAddDisciplineValidation(),
        dbAddCourse
    )
    return makeLogControllerDecorator(controller)
}
