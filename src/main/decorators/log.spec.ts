import {
    Controller,
    HttpRequest,
    HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
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
        const controllerStub = new ControllerStub()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const sut = new LogControllerDecorator(controllerStub)
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
