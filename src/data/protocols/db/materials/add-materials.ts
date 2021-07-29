import { AddMaterialModel } from '../../../../domain/usecases/materials/add-material'

export interface AddMaterialsRepository {
    add(params: AddMaterialModel): Promise<any>
}
