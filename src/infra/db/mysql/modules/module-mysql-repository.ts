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
import Progress from '../entity/progress'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ModuleMysqlRepository
    implements
        AddModuleRepository,
        LoadModuleRepository,
        UpdateModuleRepository,
        DeleteRepository {
    private readonly moduleRepository: Repository<Module>
    private readonly progressRepository: Repository<Progress>

    constructor() {
        this.moduleRepository = MysqlHelper.getRepository(Module)
        this.progressRepository = MysqlHelper.getRepository(Progress)
    }

    async add(module: AddModulesModelRepository): Promise<ModulesModel> {
        console.log(module)
        const addModule = this.moduleRepository.create({
            ...module
        })
        await this.moduleRepository.save(addModule)
        return addModule
    }
    async load(disciplineId: string, idUser: string): Promise<any> {
        const modules = async () => {
            const module = await this.moduleRepository.find({
                where: { disciplineId }
            })
            return module
        }
        const progresso = async () => {
            const progress = this.progressRepository.find({
                where: { user_id: idUser }
            })
            return progress
        }
        const montarArray = async () => {
            try {
                const arrayOfModules: any = []
                const modulos = await modules()
                const progress = await progresso()
                modulos.forEach((item, index) => {
                    arrayOfModules.push({
                        ...item,
                        progress: {
                            totalItems: 0,
                            completedItems: 0,
                            percentu: 0
                        }
                    })
                    progress.forEach((progresso) => {
                        if (arrayOfModules[index].id === progresso.moduleId) {
                            delete progresso.id
                            delete progresso.moduleId
                            arrayOfModules[index] = {
                                ...item,
                                progress: {
                                    ...progresso,
                                    percentu: (
                                        (progresso.completedItems * 100) /
                                        progresso.totalItems
                                    ).toFixed(0)
                                }
                            }
                        }
                    })
                })

                return arrayOfModules
            } catch (error) {
                return error
            }
        }
        const promise = await montarArray()
        return promise
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
