import { Delete, DeleteRepository } from './db-delete-module-protocols'

export class DbDeleteModule implements Delete {
    constructor(private readonly deleteCourseRepository: DeleteRepository) {}

    async delete(id: string): Promise<any> {
        await this.deleteCourseRepository.delete(id)
    }
}
