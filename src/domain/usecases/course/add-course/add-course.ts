import { CourseModel } from '../../../models/course/course-model'

export interface AddCourseModel {
    title: string
    figure: string
    slug?: string
}

export interface AddCourse {
    add(course: AddCourseModel): Promise<CourseModel>
}
