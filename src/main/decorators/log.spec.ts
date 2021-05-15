import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import {
    Controller,
    HttpRequest,
    HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'any_name'
                }
            }
            return new Promise((resolved) => resolved(httpResponse))
        }
    }
    return new ControllerStub()
}

const makeLogRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async log(stack: string): Promise<void> {
            return new Promise((resolved) => resolved())
        }
    }
    return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = makeLogRepository()
    const sut = new LogControllerDecorator(
        controllerStub,
        logErrorRepositoryStub
    )
    return {
        controllerStub,
        sut,
        logErrorRepositoryStub
    }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { controllerStub, sut } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                sexo: 'any_sexo',
                password: '123'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                sexo: 'any_sexo',
                password: '123'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'any_name'
            }
        })
    })
    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        const error = serverError(fakeError)
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
            new Promise((resolved) => resolved(error))
        )
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                sexo: 'any_sexo',
                password: '123'
            }
        }
        await sut.handle(httpRequest)
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})
