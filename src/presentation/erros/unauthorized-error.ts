export class UnauthorizedError extends Error {
    constructor() {
        super('Email ou senha inválidos')
        this.name = 'UnauthorizedError'
    }
}
