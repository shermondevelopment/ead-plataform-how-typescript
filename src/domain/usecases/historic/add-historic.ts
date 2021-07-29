export interface AddHistoricModel {
    user_id: string
    id_class: string
    moduleId: string
}

export interface AddHistoric {
    add(params: AddHistoricModel): Promise<any>
}
