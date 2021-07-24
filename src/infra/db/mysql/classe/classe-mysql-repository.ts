import { Repository } from 'typeorm'
import { UpdateClasseRepository } from '../../../../data/protocols/db/classe/update-classe'
import {
    AddClasseModelRepository,
    AddClasseRepository,
    ClasseModel
} from '../../../../data/usecases/classe/add-classe/db-add-classe-protocols'
import Classes from '../entity/classe'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ClasseMysqlRepository
    implements AddClasseRepository, UpdateClasseRepository {
    private readonly classeRepository: Repository<Classes>

    constructor() {
        this.classeRepository = MysqlHelper.getRepository(Classes)
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
}
