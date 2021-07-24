import { AddClasseModel } from './add-classe'

export interface UpdateClasse {
    update(idClass: string, params: Partial<AddClasseModel>): Promise<any>
}
