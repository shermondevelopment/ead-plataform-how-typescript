import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail: (email: string): boolean => {
        return true
    }
}))

const makeSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter()
}

describe('EmailValidator', () => {
    test('Should return false if validator returns false', () => {
        const sut = makeSut()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isEmail('invalid_email@mail.com')
        expect(isValid).toBe(false)
    })
})
