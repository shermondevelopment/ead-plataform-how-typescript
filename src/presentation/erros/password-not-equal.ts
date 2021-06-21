export class InvalidPassword extends Error {
    constructor() {
        super(`as senhas não correspondem`)
        this.name = 'InvalidParamError'
    }
}
