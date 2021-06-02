import { CourseModel } from '../../models/course-model'

export interface ParamCourses {
    search?: string
    page?: number
}

export interface LoadCourses {
    load(params: ParamCourses): Promise<CourseModel>
}
