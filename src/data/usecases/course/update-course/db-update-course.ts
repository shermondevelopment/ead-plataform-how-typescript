import {
    AddCourseModel,
    Slug,
    UpdateCourseRepository,
    UpdateCourse
} from './db-update-course-protocols'

export class DbUpdateCourse implements UpdateCourse {
    constructor(
        private readonly slug: Slug,
        private readonly updateCourseRepository: UpdateCourseRepository
    ) {}

    async update(
        id: any,
        courseModel: Partial<AddCourseModel>
    ): Promise<number> {
        if (courseModel.title) {
            const update = await this.updateCourseRepository.update(id, {
                ...courseModel,
                slug: this.slug.transform(courseModel.title)
            })
            return update
        }
        const update = await this.updateCourseRepository.update(id, {
            ...courseModel
        })
        return update
    }
}
