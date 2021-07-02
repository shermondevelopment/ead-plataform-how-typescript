import { Repository } from 'typeorm'
import { DeleteRepository } from '../../../../data/protocols/db/course/db-delete-course-repository'
import { AddDisciplineRepository } from '../../../../data/protocols/db/discipline/add-discpline'
import { LoadDisciplineRepository } from '../../../../data/protocols/db/discipline/load-discipline'
import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'
import Discipline from '../entity/disciplines'
import { MysqlHelper } from '../helpers/mysql-helper'

export class DisciplineMysqlRepository
    implements
        AddDisciplineRepository,
        LoadDisciplineRepository,
        DeleteRepository {
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

    async delete(id: string): Promise<any> {
        const course = await this.disciplineRepository.findOne({ id })
        await this.disciplineRepository.remove(course)
    }
}
