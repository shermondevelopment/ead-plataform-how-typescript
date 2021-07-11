import { CourseModel } from '../../../models/course/course-model'

export interface ParamCourses {
    search?: string
    page?: number
}

export interface CourseArray {
    courseArray: Array<CourseModel>
    next: boolean
}

export interface LoadCourses {
    load(params: ParamCourses): Promise<CourseArray>
}
