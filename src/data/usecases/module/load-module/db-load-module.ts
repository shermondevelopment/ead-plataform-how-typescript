import {
    ModulesModel,
    LoadModuleRepository,
    LoadModule
} from './db-load-module-protocols'

export class DbLoadModule implements LoadModule {
    constructor(private readonly loadModuleRepository: LoadModuleRepository) {}

    async load(disciplineId: string): Promise<Array<ModulesModel>> {
        const modules = await this.loadModuleRepository.load(disciplineId)
        return modules
    }
}
