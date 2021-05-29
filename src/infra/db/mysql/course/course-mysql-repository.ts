import { Repository } from 'typeorm'
import { AddCourseRepository } from '../../../../data/protocols/db/course/db-add-course-repository'
import { CourseModel } from '../../../../domain/models/course-model'
import { AddCourseModel } from '../../../../domain/usecases/add-course/add-course'
import Course from '../entity/courses'
import { MysqlHelper } from '../helpers/mysql-helper'

export class CourseMysqlRepository implements AddCourseRepository {
    private readonly courseRepository: Repository<Course>

    constructor() {
        this.courseRepository = MysqlHelper.getRepository(Course)
    }

    async add(course: AddCourseModel): Promise<CourseModel> {
        const myCourse = this.courseRepository.create(course)
        await this.courseRepository.save(myCourse)
        return myCourse
    }
}
