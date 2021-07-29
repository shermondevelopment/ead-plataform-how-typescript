import {
    AddHistoric,
    AddHistoricModel
} from '../../../domain/usecases/historic/add-historic'
import { AddHistoricRepository } from '../../protocols/db/historic/add-historic'

export class DbAddHistoric implements AddHistoric {
    constructor(
        private readonly addHistoricRepository: AddHistoricRepository
    ) {}

    async add(params: AddHistoricModel): Promise<any> {
        const historic = await this.addHistoricRepository.add(params)
        return historic
    }
}
