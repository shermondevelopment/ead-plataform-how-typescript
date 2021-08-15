export interface AccountModel {
    id: string
    name: string
    email: string
    password: string
    profile?: string
    status?: boolean
    payment?: boolean
    role?: string
    sexo?: string
    zipcode?: string
    state?: string
    city?: string
    district?: string
    address?: string
    number?: number
    phone?: string
    view_free_time: Date
}
