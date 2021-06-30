import {
    LoadDisciplineRepository,
    DisciplineModel,
    LoadDiscipline
} from './db-load-discipline.protocols'

export class DbLoadDiscipline implements LoadDiscipline {
    constructor(
        private readonly loadDisciplineRepository: LoadDisciplineRepository
    ) {}

    async load(): Promise<Array<DisciplineModel>> {
        const discipline = await this.loadDisciplineRepository.load()
        return discipline
    }
}
