import { Repository } from 'typeorm'
import { AddCourseRepository } from '../../../../data/protocols/db/course/db-add-course-repository'
import { LoadCourseRepository } from '../../../../data/protocols/db/course/db-load-course-repository'
import { Like } from 'typeorm'
import { CourseModel } from '../../../../domain/models/course-model'
import { AddCourseModel } from '../../../../domain/usecases/add-course/add-course'
import { ParamCourses } from '../../../../domain/usecases/load-courses/load-course'
import Course from '../entity/courses'
import { MysqlHelper } from '../helpers/mysql-helper'

export class CourseMysqlRepository
    implements AddCourseRepository, LoadCourseRepository {
    private readonly courseRepository: Repository<Course>

    constructor() {
        this.courseRepository = MysqlHelper.getRepository(Course)
    }

    async add(course: AddCourseModel): Promise<CourseModel> {
        const myCourse = this.courseRepository.create(course)
        await this.courseRepository.save(myCourse)
        return myCourse
    }

    async load(param: ParamCourses): Promise<any> {
        const { search, page } = param

        const courses = await this.courseRepository.findAndCount({
            where: {
                title: Like(`%${search}%`)
            },
            skip: page <= 0 ? 1 * 8 - 8 : page * 8 - 8,
            take: 8
        })
        let next = false
        if (courses[1] > page + 8) {
            next = true
        } else {
            next = false
        }
        return {
            courses: courses[0],
            next
        }
    }
}
