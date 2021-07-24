import { ClasseModel } from '../../models/classe/add-classe'

export interface AddClasseModel {
    title: string
    url: string
    order: number
    moduleId: string
}

export interface AddClasse {
    add(classesParams: AddClasseModel): Promise<ClasseModel>
}
