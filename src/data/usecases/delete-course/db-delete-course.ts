import {
    Delete,
    DeleteParam,
    ReturnDelete,
    DeleteRepository
} from './db-delete-course-protocols'

export class DbDeleteCourse implements Delete {
    constructor(private readonly deleteCourseRepository: DeleteRepository) {}

    async delete(params: DeleteParam): Promise<ReturnDelete> {
        const del = await this.deleteCourseRepository.delete(params)
        return del
    }
}
