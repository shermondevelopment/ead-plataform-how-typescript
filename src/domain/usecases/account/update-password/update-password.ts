export interface UpdatePasswordParams {
    id: string
    password: string
    confirmPassword: string
    currentPassword: string
}

export interface UpdateAccountPassword {
    updatePassword(params: UpdatePasswordParams): Promise<boolean>
}
