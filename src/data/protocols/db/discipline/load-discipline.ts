import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'

export interface LoadDisciplineRepository {
    load(): Promise<Array<DisciplineModel>>
}
