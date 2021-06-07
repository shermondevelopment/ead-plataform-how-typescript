import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { CourseMysqlRepository } from '../../../../../infra/db/mysql/course/course-mysql-repository'
import { DbDeleteCourse } from '../../../../../data/usecases/delete-course/db-delete-course'
import { DeleteCourseController } from '../../../../../presentation/controllers/course/delete-course/course-controller'

export const makeDeleteCourseController = (): Controller => {
    const courseRepository = new CourseMysqlRepository()
    const dbDeleteCourse = new DbDeleteCourse(courseRepository)
    const controller = new DeleteCourseController(dbDeleteCourse)
    return makeLogControllerDecorator(controller)
}
