import {
    ForgotPasswordRepository,
    ForgotPasswordRequestRepository
} from '../../../protocols/db/account/forgot-password-repository'
import { DbForgotPassword } from './db-account-forgot-password'

const makeFakeData = (): number => {
    const data = new Date()
    return data.setDate(data.getHours() + 48)
}

const makeFakeDbForgotPasswordRepository = (): ForgotPasswordRepository => {
    class ForgotPasswordRepository implements ForgotPasswordRepository {
        async request(data: ForgotPasswordRequestRepository): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new ForgotPasswordRepository()
}

describe('DbForgotAccount', () => {
    test('Should call ForgotPasswordRepository how correct values', async () => {
        const forgotPasswordRepository = makeFakeDbForgotPasswordRepository()
        const sut = new DbForgotPassword(forgotPasswordRepository)
        await sut.request({
            email: 'any_email@mail.com',
            tokenResetPassword: 'any_hash',
            tokenResetExpired: makeFakeData()
        })
    })
    test('Should throw if ForgotPassword throws', async () => {
        const forgotPasswordRepository = makeFakeDbForgotPasswordRepository()
        jest.spyOn(forgotPasswordRepository, 'request').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const sut = new DbForgotPassword(forgotPasswordRepository)
        const response = sut.request({
            email: 'any_email@mail.com',
            tokenResetPassword: 'any_hash',
            tokenResetExpired: makeFakeData()
        })
        await expect(response).rejects.toThrow()
    })
    test('Should ForgotPassword return success', async () => {
        const forgotPasswordRepository = makeFakeDbForgotPasswordRepository()
        const sut = new DbForgotPassword(forgotPasswordRepository)
        const response = await sut.request({
            email: 'any_email@mail.com',
            tokenResetPassword: 'any_hash',
            tokenResetExpired: makeFakeData()
        })
        expect(response).toBe(true)
    })
})
