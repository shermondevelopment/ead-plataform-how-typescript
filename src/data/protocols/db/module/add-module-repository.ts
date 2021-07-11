import { ModulesModel } from '../../../../domain/models/module/add-module'

export interface AddModulesModelRepository {
    title: string
    slug: string
    order: number
    disciplineId: string
}

export interface AddModuleRepository {
    add(modules: AddModulesModelRepository): Promise<ModulesModel>
}
