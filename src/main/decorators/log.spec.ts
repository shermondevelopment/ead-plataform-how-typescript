import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { AccountModel } from '../../domain/models/account-model'
import { serverError, ok } from '../../presentation/helpers/http-helper'
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
            return new Promise((resolved) => resolved(ok(makeFakeAccount())))
        }
    }
    return new ControllerStub()
}

const makeLogRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async logError(stack: string): Promise<void> {
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

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        sexo: 'any_sexo',
        password: '123'
    }
})

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
})

const makeFakeServerError = (): HttpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { controllerStub, sut } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(makeFakeRequest())
        expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
    })
    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeAccount()))
    })
    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
            new Promise((resolved) => resolved(makeFakeServerError()))
        )
        await sut.handle(makeFakeRequest())
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})
