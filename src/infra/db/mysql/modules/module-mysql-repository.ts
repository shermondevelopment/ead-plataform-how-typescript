import { Repository } from 'typeorm'
import {
    AddModuleRepository,
    AddModulesModelRepository
} from '../../../../data/protocols/db/module/add-module-repository'
import { ModulesModel } from '../../../../domain/models/module/add-module'
import Module from '../entity/modules'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ModuleMysqlRepository implements AddModuleRepository {
    private readonly moduleRepository: Repository<Module>

    constructor() {
        this.moduleRepository = MysqlHelper.getRepository(Module)
    }

    async add(module: AddModulesModelRepository): Promise<ModulesModel> {
        const addModule = await this.moduleRepository.save(module)
        return addModule
    }
}
