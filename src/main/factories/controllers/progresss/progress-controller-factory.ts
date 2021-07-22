import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddProgressValidation } from './progress-validation-factory'
import { ProgressMysqlRepository } from '../../../../infra/db/mysql/progress/progress-mysql-repository'
import { DbAddProgress } from '../../../../data/usecases/progress/add/db-add-progress'
import { AddProgressController } from '../../../../presentation/controllers/progress/add-progress/add-progress-controller'

export const makeAddProgressController = (): Controller => {
    const progressMysqlRepository = new ProgressMysqlRepository()
    const dbAddProgress = new DbAddProgress(progressMysqlRepository)
    const controller = new AddProgressController(
        makeAddProgressValidation(),
        dbAddProgress
    )
    return makeLogControllerDecorator(controller)
}
