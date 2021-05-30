import { Controller, HttpRequest } from '../../presentation/protocols'
import { Response, Request } from 'express'

interface MulterRequest extends Request {
    file: any
}
export const adaptRouteMulter = (controller: Controller) => {
    return async (req: MulterRequest, res: Response) => {
        const httpRequest: HttpRequest = {
            body: { ...req.body, figure: req.file.key }
        }
        const httpResponse = await controller.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}
