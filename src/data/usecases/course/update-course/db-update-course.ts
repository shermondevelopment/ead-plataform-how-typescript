import { UpdateCourse } from '../../../../domain/usecases/update-course/update-course'
import { UpdateCourseRepository } from '../../../protocols/db/course/db-update-course-repository'
import { Slug } from '../../../protocols/remodulate/slug'
import { CourseModel } from '../loading-course/loading-course-protocols'

export class DbUpdateCourse implements UpdateCourse {
    constructor(
        private readonly slug: Slug,
        private readonly updateCourseRepository: UpdateCourseRepository
    ) {}

    async update(
        courseModel: Partial<CourseModel>
    ): Promise<Partial<CourseModel>> {
        if (courseModel.title) {
            const update = await this.updateCourseRepository.update({
                ...courseModel,
                slug: this.slug.transform(courseModel.title)
            })
            return update
        }
        const update = await this.updateCourseRepository.update({
            ...courseModel
        })
        return update
    }
}
