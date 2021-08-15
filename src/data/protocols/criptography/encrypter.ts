export interface EncrypterParams {
    id: string
    name: string
    email: string
    profile: string
    status: boolean
    admin: boolean
    payment?: boolean
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

export interface Encrypter {
    encrypt(value: EncrypterParams): Promise<string>
}
