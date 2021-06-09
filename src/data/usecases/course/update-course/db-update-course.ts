import { UpdateCourse } from '../../../../domain/usecases/update-course/update-course'
import { Slug } from '../../../protocols/remodulate/slug'
import { CourseModel } from '../loading-course/loading-course-protocols'

export class DbUpdateCourse implements UpdateCourse {
    constructor(private readonly slug: Slug) {}

    async update(
        courseModel: Partial<CourseModel>
    ): Promise<Partial<CourseModel>> {
        if (courseModel.title) {
            this.slug.transform(courseModel.title)
        }
        return null
    }
}
