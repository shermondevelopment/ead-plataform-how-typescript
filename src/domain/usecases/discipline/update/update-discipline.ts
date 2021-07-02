import { AddDisciplineModel } from '../../../../data/protocols/db/discipline/add-discpline'

export interface UpdateDiscipline {
    update(id: string, courseModel: AddDisciplineModel): Promise<number>
}
