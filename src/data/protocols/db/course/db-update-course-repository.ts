import { AddCourseModel } from '../../../../domain/usecases/add-course/add-course'

export interface UpdateCourseRepository {
    update(
        courseModel: Partial<AddCourseModel>
    ): Promise<Partial<AddCourseModel>>
}
