import { Repository } from 'typeorm'
import {
    AddClasseModelRepository,
    AddClasseRepository,
    ClasseModel
} from '../../../../data/usecases/classe/add-classe/db-add-classe-protocols'
import Classes from '../entity/classe'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ClasseMysqlRepository implements AddClasseRepository {
    private readonly classeRepository: Repository<Classes>

    constructor() {
        this.classeRepository = MysqlHelper.getRepository(Classes)
    }

    async add(params: AddClasseModelRepository): Promise<ClasseModel> {
        const classe = await this.classeRepository.save(params)
        return classe
    }
}
