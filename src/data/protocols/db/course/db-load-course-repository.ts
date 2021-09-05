import { CourseArray } from '../../../../domain/usecases/course/load-courses/load-course'
import { ParamCourses } from '../../../../domain/usecases/course/load-courses/load-course'

export interface LoadCourseRepository {
    load(param: ParamCourses): Promise<CourseArray>
}
