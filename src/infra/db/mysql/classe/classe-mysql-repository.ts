import { Repository } from 'typeorm'
import { LoadClassesRepository } from '../../../../data/protocols/db/classe/load-classe'
import { UpdateClasseRepository } from '../../../../data/protocols/db/classe/update-classe'
import { DeleteRepository } from '../../../../data/protocols/db/course/db-delete-course-repository'
import {
    AddClasseModelRepository,
    AddClasseRepository,
    ClasseModel
} from '../../../../data/usecases/classe/add-classe/db-add-classe-protocols'
import Classes from '../entity/classe'
import HistoricClass from '../entity/historicClass'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ClasseMysqlRepository
    implements
        AddClasseRepository,
        UpdateClasseRepository,
        DeleteRepository,
        LoadClassesRepository {
    private readonly classeRepository: Repository<Classes>
    private readonly historicClass: Repository<HistoricClass>

    constructor() {
        this.classeRepository = MysqlHelper.getRepository(Classes)
        this.historicClass = MysqlHelper.getRepository(HistoricClass)
    }

    async add(params: AddClasseModelRepository): Promise<ClasseModel> {
        const classe = await this.classeRepository.save(params)
        return classe
    }
    async update(
        idClass: string,
        params: Partial<AddClasseModelRepository>
    ): Promise<any> {
        await this.classeRepository.update(idClass, params)
        return null
    }
    async delete(id: string): Promise<any> {
        const deleted = this.classeRepository.delete(id)
        return deleted
    }

    async loadClass(userId: string, moduleId: string): Promise<any> {
        const classes = async () => {
            const classes = await this.classeRepository.find({
                where: { moduleId }
            })
            return classes
        }

        try {
            const classe = await classes()
            const arrayOfClass: any = []
            const historic = await this.historicClass.find({
                where: { moduleId, user_id: userId }
            })

            classe.forEach((item, index, objeto) => {
                arrayOfClass.push(item)
                arrayOfClass[index].viewed = false
                historic.forEach((historic) => {
                    if (arrayOfClass[index].id === historic.id_class) {
                        arrayOfClass[index].viewed = true
                    }
                })
            })
            return arrayOfClass
        } catch (error) {
            return error
        }
    }
}
