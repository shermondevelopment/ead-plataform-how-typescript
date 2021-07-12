import { Repository } from 'typeorm'
import {
    AddModuleRepository,
    AddModulesModelRepository
} from '../../../../data/protocols/db/module/add-module-repository'
import { LoadModuleRepository } from '../../../../data/protocols/db/module/load-module-repository'
import { ModulesModel } from '../../../../domain/models/module/add-module'
import Module from '../entity/modules'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ModuleMysqlRepository
    implements AddModuleRepository, LoadModuleRepository {
    private readonly moduleRepository: Repository<Module>

    constructor() {
        this.moduleRepository = MysqlHelper.getRepository(Module)
    }

    async add(module: AddModulesModelRepository): Promise<ModulesModel> {
        const addModule = await this.moduleRepository.save(module)
        return addModule
    }
    async load(disciplineId: string): Promise<Array<ModulesModel>> {
        const modules = await this.moduleRepository.find({
            where: { disciplineId },
            order: {
                order: 'ASC'
            }
        })
        return modules
    }
}
