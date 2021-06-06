export interface DeleteParam {
    id: string
}

export interface ReturnDelete {
    delete: boolean
}

export interface Delete {
    delete(params: DeleteParam): Promise<ReturnDelete>
}
