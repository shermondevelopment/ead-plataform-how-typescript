import { CourseModel } from '../../../domain/models/course-model'
import {
    AddCourse,
    AddCourseModel
} from '../../../domain/usecases/add-course/add-course'
import { Slug } from '../../protocols/remodulate/slug'

export class DbAddCourse implements AddCourse {
    constructor(private readonly slug: Slug) {}

    async add(course: AddCourseModel): Promise<CourseModel> {
        this.slug.transform(course.title)
        return null
    }
}
