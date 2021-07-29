import {
    AddMaterial,
    AddMaterialModel
} from '../../../domain/usecases/materials/add-material'
import { AddMaterialsRepository } from '../../protocols/db/materials/add-materials'

export class DbAddMaterials implements AddMaterial {
    constructor(
        private readonly addMaterialssRepository: AddMaterialsRepository
    ) {}

    async add(params: AddMaterialModel): Promise<any> {
        await this.addMaterialssRepository.add(params)
        return null
    }
}
