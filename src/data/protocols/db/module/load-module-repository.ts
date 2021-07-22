import { ModulesModel } from '../../../usecases/module/add-module/db-add-module-protocols'

export interface LoadModuleRepository {
    load(disciplineId: string, idUser: string): Promise<Array<ModulesModel>>
}
