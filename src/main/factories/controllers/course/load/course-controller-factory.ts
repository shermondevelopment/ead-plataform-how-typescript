import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { CourseMysqlRepository } from '../../../../../infra/db/mysql/course/course-mysql-repository'
import { LoadCourseController } from '../../../../../presentation/controllers/course/load-course/course-controller'
import { DbLoadingCourse } from '../../../../../data/usecases/loading-course/loading-course'

export const makeLoadCourseController = (): Controller => {
    const courseRepository = new CourseMysqlRepository()
    const loadingCourse = new DbLoadingCourse(courseRepository)
    const controller = new LoadCourseController(loadingCourse)
    return makeLogControllerDecorator(controller)
}
