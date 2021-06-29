import { Repository } from 'typeorm'
import { AddDisciplineRepository } from '../../../../data/protocols/db/discipline/add/add-discpline'
import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'
import Discipline from '../entity/disciplines'
import { MysqlHelper } from '../helpers/mysql-helper'

export class DisciplineMysqlRepository implements AddDisciplineRepository {
    private readonly disciplineRepository: Repository<Discipline>

    constructor() {
        this.disciplineRepository = MysqlHelper.getRepository(Discipline)
    }

    async add(params: DisciplineModel): Promise<DisciplineModel> {
        const discipline = await this.disciplineRepository.save(params)
        return discipline
    }
}
