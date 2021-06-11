import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { CourseMysqlRepository } from '../../../../../infra/db/mysql/course/course-mysql-repository'
import { DbUpdateCourse } from '../../../../../data/usecases/course/update-course/db-update-course'
import { UpdateCourseController } from '../../../../../presentation/controllers/course/update-course/update-course-controller'
import { SlugIfyadapter } from '../../../../../infra/slugify/slugify-adapter'

export const makeUpdateController = (): Controller => {
    const courseRepository = new CourseMysqlRepository()
    const slug = new SlugIfyadapter()
    const updateCourse = new DbUpdateCourse(slug, courseRepository)
    const controller = new UpdateCourseController(updateCourse)
    return makeLogControllerDecorator(controller)
}
