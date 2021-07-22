export interface AddProgressModel {
    user_id: string
    totalItems: number
    completedItems: number
    disciplineId: string
    moduleId: string
}

export interface AddProgress {
    add(params: AddProgressModel): Promise<any>
}
