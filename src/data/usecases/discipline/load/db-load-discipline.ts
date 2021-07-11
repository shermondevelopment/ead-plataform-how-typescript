import {
    LoadDisciplineRepository,
    DisciplineModel,
    LoadDiscipline
} from './db-load-discipline.protocols'

export class DbLoadDiscipline implements LoadDiscipline {
    constructor(
        private readonly loadDisciplineRepository: LoadDisciplineRepository
    ) {}

    async load(id: string): Promise<Array<DisciplineModel>> {
        const discipline = await this.loadDisciplineRepository.load(id)
        return discipline
    }
}
