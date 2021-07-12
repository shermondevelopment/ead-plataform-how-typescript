import { AddModulesModelRepository } from '../../../usecases/module/add-module/db-add-module-protocols'

export interface UpdateModuleRepository {
    update(
        moduleId: string,
        modelUpdate: Partial<AddModulesModelRepository>
    ): Promise<number>
}
