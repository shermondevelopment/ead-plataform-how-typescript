import {
    CourseModel,
    AddCourse,
    AddCourseModel,
    AddCourseRepository,
    Slug
} from './db-add-course-protocols'

export class DbAddCourse implements AddCourse {
    constructor(
        private readonly slug: Slug,
        private readonly addCourseRepository: AddCourseRepository
    ) {}

    async add(course: AddCourseModel): Promise<CourseModel> {
        const { title, figure } = course
        const transformSlug = this.slug.transform(title)
        const accountCourse = await this.addCourseRepository.add({
            title,
            figure,
            slug: transformSlug
        })
        return accountCourse
    }
}
