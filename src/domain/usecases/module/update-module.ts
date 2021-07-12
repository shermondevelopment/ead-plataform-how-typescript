import { AddModulesModel } from './add-module'

export interface UpdateModule {
    update(
        moduleId: string,
        moduleModel: Partial<AddModulesModel>
    ): Promise<number>
}
