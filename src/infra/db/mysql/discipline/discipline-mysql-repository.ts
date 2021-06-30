import { Repository } from 'typeorm'
import { AddDisciplineRepository } from '../../../../data/protocols/db/discipline/add-discpline'
import { LoadDisciplineRepository } from '../../../../data/protocols/db/discipline/load-discipline'
import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'
import Discipline from '../entity/disciplines'
import { MysqlHelper } from '../helpers/mysql-helper'

export class DisciplineMysqlRepository
    implements AddDisciplineRepository, LoadDisciplineRepository {
    private readonly disciplineRepository: Repository<Discipline>

    constructor() {
        this.disciplineRepository = MysqlHelper.getRepository(Discipline)
    }

    async add(params: DisciplineModel): Promise<DisciplineModel> {
        const discipline = await this.disciplineRepository.save(params)
        return discipline
    }

    async load(): Promise<Array<DisciplineModel>> {
        const discipline = await this.disciplineRepository.find()
        return discipline
    }
}
