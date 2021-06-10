import { AddCourseModel } from '../add-course/add-course'

export interface UpdateCourse {
    update(id: any, courseModel: Partial<AddCourseModel>): Promise<number>
}
