import { ClasseModel } from '../../../../domain/models/classe/add-classe'

export interface AddClasseModelRepository {
    title: string
    slug: string
    order: number
    url: string
    moduleId: string
}

export interface AddClasseRepository {
    add(paramsClasse: AddClasseModelRepository): Promise<ClasseModel>
}
