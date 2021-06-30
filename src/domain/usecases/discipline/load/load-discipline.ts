import { DisciplineModel } from '../../../models/discipline/add-discipline'

export interface LoadDiscipline {
    load(): Promise<Array<DisciplineModel>>
}
