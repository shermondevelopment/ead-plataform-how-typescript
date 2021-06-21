export interface ResetPasswordParamsRepository {
    token: string
    password: string
}

export interface ResetPasswordRepository {
    reset(token: ResetPasswordParamsRepository): Promise<boolean>
}
