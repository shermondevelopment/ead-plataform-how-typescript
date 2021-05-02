export class InternalServerError extends Error {
    constructor() {
        super('erro interno do servidor, tente novamente')
        this.name = 'InternalServerError'
    }
}
