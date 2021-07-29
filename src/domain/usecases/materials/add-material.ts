export interface AddMaterialModel {
    title: string
    url: string
    order: number
    moduleId: string
}

export interface AddMaterial {
    add(params: AddMaterialModel): Promise<any>
}
