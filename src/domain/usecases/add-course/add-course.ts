import { CourseModel } from '../../models/course-model'

export interface AddCourseModel {
    title: string
    figure: string
}

export interface AddCourse {
    add(course: AddCourseModel): Promise<CourseModel>
}
