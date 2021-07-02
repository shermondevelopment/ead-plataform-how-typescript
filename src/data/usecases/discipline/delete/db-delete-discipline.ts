import { Delete, DeleteRepository } from './db-delete-discipline-protocols'

export class DbDeleteDiscipline implements Delete {
    constructor(private readonly deleteCourseRepository: DeleteRepository) {}

    async delete(id: string): Promise<any> {
        await this.deleteCourseRepository.delete(id)
    }
}
