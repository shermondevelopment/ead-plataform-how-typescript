import {
    InternalServerError,
    UnauthorizedError,
    DataNotExists
} from '../../erros'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})
export const notDataExists = (message: string): HttpResponse => ({
    statusCode: 404,
    body: new DataNotExists(message)
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})
