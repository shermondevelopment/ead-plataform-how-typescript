import { CourseModel } from '../../../../domain/models/course-model'
import { ParamCourses } from '../../../../domain/usecases/load-courses/load-course'

export interface LoadCourseRepository {
    load(param: ParamCourses): Promise<CourseModel>
}
