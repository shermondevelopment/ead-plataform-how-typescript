import { DisciplineModel } from '../../../../../domain/models/discipline/add-discipline'

export interface AddDisciplineRepository {
    add(params: DisciplineModel): Promise<DisciplineModel>
}
