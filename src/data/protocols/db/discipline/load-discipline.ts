import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'

export interface LoadDisciplineRepository {
    load(id: string): Promise<Array<DisciplineModel>>
}
