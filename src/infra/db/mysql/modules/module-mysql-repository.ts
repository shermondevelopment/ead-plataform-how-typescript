import { Repository } from 'typeorm'
import { DeleteRepository } from '../../../../data/protocols/db/course/db-delete-course-repository'
import {
    AddModuleRepository,
    AddModulesModelRepository
} from '../../../../data/protocols/db/module/add-module-repository'
import { LoadModuleRepository } from '../../../../data/protocols/db/module/load-module-repository'
import { UpdateModuleRepository } from '../../../../data/protocols/db/module/update-module-repository'
import { ModulesModel } from '../../../../domain/models/module/add-module'
import Module from '../entity/modules'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ModuleMysqlRepository
    implements
        AddModuleRepository,
        LoadModuleRepository,
        UpdateModuleRepository,
        DeleteRepository {
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
    async update(
        moduleId: string,
        updateModule: Partial<AddModulesModelRepository>
    ): Promise<number> {
        const id = moduleId
        const updated = await this.moduleRepository.update(id, {
            ...updateModule
        })
        return updated.affected
    }
    async delete(id: string): Promise<any> {
        const course = await this.moduleRepository.findOne({ id })
        await this.moduleRepository.remove(course)
    }
}
