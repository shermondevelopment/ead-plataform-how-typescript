export class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`o campo ${paramName} e obrigatorio`)
        this.name = 'MissingParamError'
    }
}
