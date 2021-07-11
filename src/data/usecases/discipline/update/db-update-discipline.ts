import {} from '../../../protocols/db/discipline/update-discipline'
import {
    Slug,
    UpdateDisciplineRepository,
    UpdateDiscipline,
    PartialUpdatedDiscipline
} from './db-update-discipline-protocols'

export class DbUpdateDiscipline implements UpdateDiscipline {
    constructor(
        private readonly slug: Slug,
        private readonly updateDisciplineRepository: UpdateDisciplineRepository
    ) {}

    async update(
        id: string,
        disciplineModel: PartialUpdatedDiscipline
    ): Promise<number> {
        const update = await this.updateDisciplineRepository.update(id, {
            ...disciplineModel,
            slug: this.slug.transform(disciplineModel.title)
        })
        return update
    }
}
