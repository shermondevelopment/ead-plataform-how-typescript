import {
    LoadCourses,
    ParamCourses,
    LoadCourseRepository,
    CourseModel
} from './loading-course-protocols'

export class DbLoadingCourse implements LoadCourses {
    constructor(
        private readonly loadingCoursesRepository: LoadCourseRepository
    ) {}

    async load(params: ParamCourses): Promise<CourseModel> {
        const { search, page } = params
        const courses = await this.loadingCoursesRepository.load({
            search,
            page
        })
        return courses
    }
}
