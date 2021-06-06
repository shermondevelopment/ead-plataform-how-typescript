import {
    Delete,
    DeleteParam,
    ReturnDelete
} from '../../../domain/usecases/delete-course/delete'
import { DeleteRepository } from '../../protocols/db/course/db-delete-course-repository'

export class DbDeleteCourse implements Delete {
    constructor(private readonly deleteCourseRepository: DeleteRepository) {}

    async delete(params: DeleteParam): Promise<ReturnDelete> {
        await this.deleteCourseRepository.delete(params)
        return null
    }
}
