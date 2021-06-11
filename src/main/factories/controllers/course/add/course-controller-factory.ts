import { makeAddCourseValidation } from './course-validation-factory'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddCourseController } from '../../../../../presentation/controllers/course/add-course/course-controller'
import { DbAddCourse } from '../../../../../data/usecases/course/add-course/db-add-course'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'
import { CourseMysqlRepository } from '../../../../../infra/db/mysql/course/course-mysql-repository'

export const makeAddCourseController = (): Controller => {
    const slug = new SlugIfyadapter()
    const courseMysqlRepository = new CourseMysqlRepository()
    const dbAddCourse = new DbAddCourse(slug, courseMysqlRepository)
    const controller = new AddCourseController(
        makeAddCourseValidation(),
        dbAddCourse
    )
    return makeLogControllerDecorator(controller)
}
