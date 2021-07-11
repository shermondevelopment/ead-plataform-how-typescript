import {
    Slug,
    AddModuleRepository,
    AddModulesModel,
    AddModules,
    ModulesModel
} from './db-add-module-protocols'

export class DbAddModule implements AddModules {
    constructor(
        private readonly slug: Slug,
        private readonly addModuleRepository: AddModuleRepository
    ) {}

    async add(module: AddModulesModel): Promise<ModulesModel> {
        const slug = this.slug.transform(module.title)
        const addModule = await this.addModuleRepository.add({
            ...module,
            slug
        })
        return addModule
    }
}
