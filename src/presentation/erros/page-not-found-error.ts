export class PageNotFound extends Error {
    constructor() {
        super(`Page not found`)
        this.name = 'PageNotFound'
    }
}
