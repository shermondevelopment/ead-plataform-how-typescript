import { DisciplineModel } from '../../../models/discipline/add-discipline'

export interface LoadDiscipline {
    load(id: string): Promise<Array<DisciplineModel>>
}
