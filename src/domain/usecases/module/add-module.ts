import { ModulesModel } from '../../models/module/add-module'

export interface AddModulesModel {
    title: string
    order: number
    qtmaterials: number
    disciplineId: string
}

export interface AddModules {
    add(modules: AddModulesModel): Promise<ModulesModel>
}
