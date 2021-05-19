import { EmailValidation } from './email-validation'
import { EmailValidator } from '../email-validator'
import { InvalidParamError } from '../../erros'

interface SutTypes {
    sut: EmailValidation
    emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isEmail(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidatorStub()
    const sut = new EmailValidation('email', emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe('EmailValidation', () => {
    test('Should return an error if EmailValidator return false', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
        const httpResponse = sut.validate({ email: 'any_email@mail.com' })
        expect(httpResponse).toEqual(new InvalidParamError('email'))
    })
    test('Should must call EmailValidator with a correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
        const spyIsEmail = jest.spyOn(emailValidatorStub, 'isEmail')
        sut.validate({ email: 'any_email@mail.com' })
        expect(spyIsEmail).toHaveBeenCalledWith('any_email@mail.com')
    })
    test('Should throw if EmailValidaotr throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isEmail').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })
})
