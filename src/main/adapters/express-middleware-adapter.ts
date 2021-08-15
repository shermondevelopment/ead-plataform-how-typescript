import { HttpRequest, Middleware } from '../../presentation/protocols'
import { Response, Request, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = {
            headers: req.headers,
            accountId: req.accountId
        }

        const httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            req.accountId = httpResponse.body.accountId
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}
