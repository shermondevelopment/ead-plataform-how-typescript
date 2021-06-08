import { AddCourseModel } from '../add-course/add-course'

export interface UpdateCourse {
    update(
        courseModel: Partial<AddCourseModel>
    ): Promise<Partial<AddCourseModel>>
}
