import { Repository } from 'typeorm'
import { DeleteRepository } from '../../../../data/protocols/db/course/db-delete-course-repository'
import {
    AddModuleRepository,
    AddModulesModelRepository
} from '../../../../data/protocols/db/module/add-module-repository'
import { LoadClassRepository } from '../../../../data/protocols/db/module/load-class-from-module'
import { LoadModuleRepository } from '../../../../data/protocols/db/module/load-module-repository'
import { LoadProgressRepository } from '../../../../data/protocols/db/module/load-progress-module'
import { UpdateModuleRepository } from '../../../../data/protocols/db/module/update-module-repository'
import { ModulesModel } from '../../../../domain/models/module/add-module'
import { LoadProgressResponse } from '../../../../domain/models/module/load-progress-module'
import { LoadProgressRequest } from '../../../../domain/usecases/module/load-progress-module'
import Classes from '../entity/classe'
import HistoricClass from '../entity/historicClass'
import Materials from '../entity/materials'
import Module from '../entity/modules'
import Progress from '../entity/progress'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ModuleMysqlRepository
    implements
        AddModuleRepository,
        LoadModuleRepository,
        UpdateModuleRepository,
        DeleteRepository,
        LoadProgressRepository,
        LoadClassRepository {
    private readonly moduleRepository: Repository<Module>
    private readonly progressRepository: Repository<Progress>
    private readonly classRepository: Repository<Classes>
    private readonly historicClass: Repository<HistoricClass>
    private readonly materialsRepository: Repository<Materials>

    constructor() {
        this.moduleRepository = MysqlHelper.getRepository(Module)
        this.progressRepository = MysqlHelper.getRepository(Progress)
        this.classRepository = MysqlHelper.getRepository(Classes)
        this.historicClass = MysqlHelper.getRepository(HistoricClass)
        this.materialsRepository = MysqlHelper.getRepository(Materials)
    }

    async add(module: AddModulesModelRepository): Promise<ModulesModel> {
        const addModule = this.moduleRepository.create({
            ...module
        })
        await this.moduleRepository.save(addModule)
        return addModule
    }
    async load(disciplineId: string, idUser: string): Promise<any> {
        const modules = async () => {
            const module = await this.moduleRepository.find({
                where: { disciplineId },
                order: { order: 'ASC' }
            })
            return module
        }
        const progresso = async () => {
            const progress = this.progressRepository.find({
                where: { user_id: idUser },
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
                                    percentu: parseInt(
                                        (
                                            (progresso.completedItems * 100) /
                                            progresso.totalItems
                                        ).toFixed(0)
                                    )
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
    async loadProgress(
        loadParams: LoadProgressRequest
    ): Promise<LoadProgressResponse> {
        const qt_modules = await this.moduleRepository.count({
            where: { disciplineId: loadParams.disciplineId }
        })
        const qt_concluded = await this.progressRepository.find({
            where: {
                user_id: loadParams.user_id,
                disciplineId: loadParams.disciplineId
            }
        })

        let x = 0
        qt_concluded.forEach((item) => {
            if (item.completedItems === item.totalItems) {
                x += 1
            }
        })

        return {
            qt_modules,
            qt_concluded: x,
            percentu: (x * 100) / qt_modules
        }
    }
    async loadClass(userId: string, moduleId: string): Promise<any> {
        const modules = async () => {
            const module = await this.moduleRepository.findOne({
                where: { id: moduleId }
            })
            return module
        }

        const montarArray = async () => {
            try {
                const module = await modules()
                const arrayModule: any = []
                arrayModule.push(module)

                const materials = await this.materialsRepository.find({
                    where: { moduleId: module.id }
                })

                const classes = await this.classRepository.find({
                    where: { moduleId: module.id },
                    order: { order: 'ASC' }
                })

                const historic = await this.historicClass.find({
                    where: { user_id: userId, moduleId: module.id }
                })

                classes.forEach((item, index, objeto) => {
                    arrayModule[0].classes = objeto
                    arrayModule[0].classes[index].viewed = false
                    historic.forEach((historic) => {
                        if (item.id === historic.id_class) {
                            arrayModule[0].classes[index].viewed = true
                        }
                    })
                })
                materials.forEach((item, index, objeto) => {
                    arrayModule[0].materials = objeto
                    arrayModule[0].materials[index].viewed = false
                    historic.forEach((historic) => {
                        if (item.id === historic.id_class) {
                            arrayModule[0].materials[index].viewed = true
                        }
                    })
                })
                return arrayModule
            } catch (error) {
                return error
            }
        }
        const result = await montarArray()
        return result
    }
}
