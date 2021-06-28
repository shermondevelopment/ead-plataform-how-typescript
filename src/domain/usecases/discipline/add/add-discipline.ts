import { DisciplineModel } from '../../../models/discipline/add-discipline'

export interface AddDisciplineModel {
    title: string
}

export interface AddDiscipline {
    add(param: AddDisciplineModel): Promise<DisciplineModel>
}
