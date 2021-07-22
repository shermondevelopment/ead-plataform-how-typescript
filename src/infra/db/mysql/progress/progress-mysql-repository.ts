import { Repository } from 'typeorm'
import { AddProgressRepository } from '../../../../data/protocols/db/progress/add-progress'
import { AddProgressModel } from '../../../../domain/usecases/progress/add-progress'
import Progress from '../entity/progress'
import { MysqlHelper } from '../helpers/mysql-helper'

export class ProgressMysqlRepository implements AddProgressRepository {
    private readonly progressRepository: Repository<Progress>

    constructor() {
        this.progressRepository = MysqlHelper.getRepository(Progress)
    }

    async add(params: AddProgressModel): Promise<any> {
        const progress = await this.progressRepository.findOne({
            where: {
                user_id: params.user_id,
                moduleId: params.moduleId
            }
        })
        if (progress) {
            if (progress.completedItems < progress.totalItems) {
                progress.completedItems += params.completedItems
                await this.progressRepository.save(progress)
            }
        }
        if (!progress) {
            await this.progressRepository.save(params)
        }
        return null
    }
}
