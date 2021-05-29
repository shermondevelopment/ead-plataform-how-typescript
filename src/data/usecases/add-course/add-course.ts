import { CourseModel } from '../../../domain/models/course-model'
import {
    AddCourse,
    AddCourseModel
} from '../../../domain/usecases/add-course/add-course'
import { AddCourseRepository } from '../../protocols/db/course/db-add-course-repository'
import { Slug } from '../../protocols/remodulate/slug'

export class DbAddCourse implements AddCourse {
    constructor(
        private readonly slug: Slug,
        private readonly addCourseRepository: AddCourseRepository
    ) {}

    async add(course: AddCourseModel): Promise<CourseModel> {
        const { title, figure, slug } = course
        const transformSlug = this.slug.transform(slug)
        const accountCourse = await this.addCourseRepository.add({
            title,
            figure,
            slug: transformSlug
        })
        return accountCourse
    }
}
