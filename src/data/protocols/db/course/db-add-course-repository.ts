import { CourseModel } from '../../../../domain/models/course/course-model'
import { AddCourseModel } from '../../../../domain/usecases/course/add-course/add-course'

export interface AddCourseRepository {
    add(course: AddCourseModel): Promise<CourseModel>
}
