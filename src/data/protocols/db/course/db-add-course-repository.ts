import { CourseModel } from '../../../../domain/models/course-model'
import { AddCourseModel } from '../../../../domain/usecases/add-course/add-course'

export interface AddCourseRepository {
    add(course: AddCourseModel): Promise<CourseModel>
}
