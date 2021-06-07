import { Delete, DeleteRepository } from './db-delete-course-protocols'

export class DbDeleteCourse implements Delete {
    constructor(private readonly deleteCourseRepository: DeleteRepository) {}

    async delete(id: string): Promise<any> {
        await this.deleteCourseRepository.delete(id)
    }
}
