import { AddCourseModel } from '../../../../domain/usecases/course/add-course/add-course'

export interface UpdateCourseRepository {
    update(id: any, courseModel: Partial<AddCourseModel>): Promise<number>
}
