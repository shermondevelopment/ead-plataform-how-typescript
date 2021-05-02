export class InvalidParamError extends Error {
    constructor(paramName: string) {
        super(`insira um ${paramName} válido`)
        this.name = 'InvalidParamError'
    }
}
