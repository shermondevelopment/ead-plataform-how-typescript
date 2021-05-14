import {
    Controller,
    HttpRequest,
    HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'any_name',
                    email: 'any_email@mail.com',
                    sexo: 'any_sexo',
                    password: '123'
                }
            }
            return new Promise((resolved) => resolved(httpResponse))
        }
    }
    return new ControllerStub()
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const sut = new LogControllerDecorator(controllerStub)
    return {
        controllerStub,
        sut
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
})
