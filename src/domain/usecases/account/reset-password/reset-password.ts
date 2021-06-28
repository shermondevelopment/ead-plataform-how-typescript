export interface ResetPasswordParams {
    token: string
    password: string
}

export interface ResetPassword {
    reset(token: ResetPasswordParams): Promise<boolean>
}
