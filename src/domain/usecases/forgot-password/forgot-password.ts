export interface ForgotPasswordRequest {
    email: string
    tokenResetPassword: string
    tokenResetExpired: number
}

export interface ForgotPassword {
    request(data: ForgotPasswordRequest): Promise<boolean>
}
