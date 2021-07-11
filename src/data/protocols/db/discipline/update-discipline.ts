import { AddDisciplineModel } from './add-discpline'

export type PartialUpdatedDiscipline = Pick<
    AddDisciplineModel,
    'title' | 'slug'
>

export interface UpdateDisciplineRepository {
    update(
        id: string,
        disciplineModel: PartialUpdatedDiscipline
    ): Promise<number>
}
