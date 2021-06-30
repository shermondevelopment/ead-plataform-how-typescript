import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'

export interface AddDisciplineModel {
    title: string
    slug: string
}

export interface AddDisciplineRepository {
    add(params: AddDisciplineModel): Promise<DisciplineModel>
}
