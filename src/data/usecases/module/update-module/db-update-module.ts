import {
    AddModulesModelRepository,
    Slug,
    UpdateModuleRepository,
    UpdateModule
} from './db-update-module-protocols'

export class DbUpdateModule implements UpdateModule {
    constructor(
        private readonly slug: Slug,
        private readonly updateModuleRepository: UpdateModuleRepository
    ) {}

    async update(
        moduleId: string,
        updateModule: Partial<AddModulesModelRepository>
    ): Promise<number> {
        const slug = this.slug.transform(updateModule.title)
        if (updateModule.title) {
            const updated = await this.updateModuleRepository.update(moduleId, {
                ...updateModule,
                slug
            })
            return updated
        }
        const updated = await this.updateModuleRepository.update(moduleId, {
            ...updateModule
        })
        return updated
    }
}
