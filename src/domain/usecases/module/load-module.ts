import { ModulesModel } from '../../models/module/add-module'

export interface LoadModule {
    load(disciplineId: string): Promise<Array<ModulesModel>>
}
