export class EmailInUseError extends Error {
    constructor() {
        super('o email já está cadastrado')
        this.name = 'EmailInUseError'
    }
}
