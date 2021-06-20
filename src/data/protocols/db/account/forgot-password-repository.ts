export interface ForgotPasswordRequestRepository {
    email: string
    tokenResetPassword: string
    tokenResetExpired: number
}

export interface ForgotPasswordRepository {
    request(data: ForgotPasswordRequestRepository): Promise<boolean>
}
