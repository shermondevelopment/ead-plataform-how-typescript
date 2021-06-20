export class DataNotExists extends Error {
    constructor(message: string) {
        super(`${message} não encontrado`)
        this.name = 'DataNotExists'
    }
}
