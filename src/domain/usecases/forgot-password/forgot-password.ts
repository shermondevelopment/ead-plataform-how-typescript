export interface ForgotPasswordRequest {
    email: 'string'
}

export interface ForgotPassword {
    email(email: ForgotPasswordRequest): Promise<boolean>
}
