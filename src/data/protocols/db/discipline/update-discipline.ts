import { AddDisciplineModel } from './add-discpline'

export interface UpdateDisciplineRepository {
    update(id: string, disciplineModel: AddDisciplineModel): Promise<number>
}
