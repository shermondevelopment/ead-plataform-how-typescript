import { InternalServerError, UnauthorizedError } from '../erros'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})
