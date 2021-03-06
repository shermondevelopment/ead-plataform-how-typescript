import { DisciplineModel } from '../../../../domain/models/discipline/add-discipline'
import {
    AddDiscipline,
    AddDisciplineModel
} from '../../../../domain/usecases/discipline/add/add-discipline'
import { AddDisciplineRepository } from '../../../protocols/db/discipline/add-discpline'
import { Slug } from '../../course/add-course/db-add-course-protocols'

export class DbAddDiscipline implements AddDiscipline {
    constructor(
        private readonly slug: Slug,
        private readonly addDisciplineRepository: AddDisciplineRepository
    ) {}

    async add(params: AddDisciplineModel): Promise<DisciplineModel> {
        const slug = this.slug.transform(params.title)
        const discipline = await this.addDisciplineRepository.add({
            title: params.title,
            slug,
            qt_modules: params.qt_modules,
            courseId: params.courseId
        })
        return discipline
    }
}
