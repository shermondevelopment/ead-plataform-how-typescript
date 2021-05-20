import {
    AddAccount,
    AddAccountModel,
    AccountModel,
    Validation
} from './signup-protocols'
import { MissingParamError, InternalServerError } from '../../erros'
import { serverError, ok, badRequest } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { SignUpController } from './signup'

interface SutTypes {
    sut: SignUpController
    addAccountStub: AddAccount
    validationStub: Validation
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        sexo: 'any_password',
        password: 'any_password'
    }
})

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password'
})

const makeAddAccountStub = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountModel): Promise<AccountModel> {
            return new Promise((resolve) => resolve(makeFakeAccount()))
        }
    }
    return new AddAccountStub()
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccountStub()
    const validationStub = makeValidation()
    const sut = new SignUpController(addAccountStub, validationStub)
    return {
        sut,
        addAccountStub,
        validationStub
    }
}

describe('SignUpController', () => {
    test('Should return 500 if an invalid addAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new InternalServerError(null)))
    })
    test('should return 200 if SignUpController return on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeAccount()))
    })
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
            new MissingParamError('any_field')
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(
            badRequest(new MissingParamError('any_field'))
        )
    })
})
