export class InternalServerError extends Error {
    constructor(stack: string) {
        super('erro interno do servidor, tente novamente')
        this.name = 'InternalServerError'
        this.stack = stack
    }
}
