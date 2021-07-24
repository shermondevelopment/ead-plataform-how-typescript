import { Delete } from '../../course/delete-course/db-delete-course-protocols'

export class DbDeleteClass implements Delete {
    constructor(private readonly dbDelete: Delete) {}

    async delete(id: string): Promise<any> {
        const deleted = await this.dbDelete.delete(id)
        return deleted
    }
}
