import { AddClasseModelRepository } from '../../../usecases/classe/add-classe/db-add-classe-protocols'

export interface UpdateClasseRepository {
    update(
        idClasse: string,
        params: Partial<AddClasseModelRepository>
    ): Promise<any>
}
