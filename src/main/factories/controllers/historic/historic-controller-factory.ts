import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { HistoricMysqlRepository } from '../../../../infra/db/mysql/historic/historic-mysql-repository'
import { DbAddHistoric } from '../../../../data/usecases/historic/db-add-historic'
import { AddHistoricController } from '../../../../presentation/controllers/historic/historic-controller'

export const makeAddHistoricController = (): Controller => {
    const historicMysqlRepository = new HistoricMysqlRepository()
    const dbAddHistoric = new DbAddHistoric(historicMysqlRepository)
    const controller = new AddHistoricController(dbAddHistoric)
    return makeLogControllerDecorator(controller)
}
