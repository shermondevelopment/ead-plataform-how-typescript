import { AddHistoricModel } from '../../../../domain/usecases/historic/add-historic'

export interface AddHistoricRepository {
    add(params: AddHistoricModel): Promise<any>
}
