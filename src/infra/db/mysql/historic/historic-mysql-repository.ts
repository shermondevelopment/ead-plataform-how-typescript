import { Repository } from 'typeorm'
import { AddHistoricRepository } from '../../../../data/protocols/db/historic/add-historic'
import { AddHistoricModel } from '../../../../domain/usecases/historic/add-historic'
import HistoricClass from '../entity/historicClass'
import { MysqlHelper } from '../helpers/mysql-helper'

export class HistoricMysqlRepository implements AddHistoricRepository {
    private readonly historicRepository: Repository<HistoricClass>

    constructor() {
        this.historicRepository = MysqlHelper.getRepository(HistoricClass)
    }

    async add(params: AddHistoricModel): Promise<any> {
        await this.historicRepository.save(params)
        return null
    }
}
