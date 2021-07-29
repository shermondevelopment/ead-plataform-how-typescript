import { Repository } from 'typeorm'
import { AddMaterialsRepository } from '../../../../data/protocols/db/materials/add-materials'
import { AddMaterialModel } from '../../../../domain/usecases/materials/add-material'
import Materials from '../entity/materials'
import { MysqlHelper } from '../helpers/mysql-helper'

export class MaterialsMysqlRepository implements AddMaterialsRepository {
    private readonly materialsRepository: Repository<Materials>

    constructor() {
        this.materialsRepository = MysqlHelper.getRepository(Materials)
    }

    async add(params: AddMaterialModel): Promise<any> {
        await this.materialsRepository.save(params)
        return null
    }
}
