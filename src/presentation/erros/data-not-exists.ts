export class DataNotExists extends Error {
    constructor(message: string) {
        super(`${message}`)
        this.name = 'DataNotExists'
    }
}
