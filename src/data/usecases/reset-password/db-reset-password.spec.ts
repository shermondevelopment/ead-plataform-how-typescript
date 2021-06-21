import {
    ResetPasswordRepository,
    ResetPasswordParamsRepository
} from '../../protocols/db/account/reset-password-repository'
import { Hash } from '../add-account/db-add-account-protocols'
import { DbResetPassword } from './db-reset-password'

interface SutTypes {
    sut: DbResetPassword
    resetPasswordStub: ResetPasswordRepository
    hashStub: Hash
}

const makeFakeResetPasswordRepository = (): ResetPasswordRepository => {
    class ResetPasswordRepositoryStub implements ResetPasswordRepository {
        async reset(token: ResetPasswordParamsRepository): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new ResetPasswordRepositoryStub()
}

const HashStub = () => {
    class HashStub implements Hash {
        async hash(password: string): Promise<string> {
            return new Promise((resolve) => resolve('hashed_password'))
        }
    }
    return new HashStub()
}

const makeSut = (): SutTypes => {
    const hashStub = HashStub()
    const resetPasswordStub = makeFakeResetPasswordRepository()
    const sut = new DbResetPassword(resetPasswordStub, hashStub)

    return {
        sut,
        resetPasswordStub,
        hashStub
    }
}

const makeFakeRequest = () => ({
    token: 'any_token',
    password: 'any_password'
})

describe('ResetPassword Repository', () => {
    test('Should call ResetPasswordRepository how correct values', async () => {
        const { sut, resetPasswordStub } = makeSut()
        const spyResetPassword = jest.spyOn(resetPasswordStub, 'reset')
        await sut.reset(makeFakeRequest())
        expect(spyResetPassword).toHaveBeenCalledWith({
            token: 'any_token',
            password: 'hashed_password'
        })
    })
    test('Should throws ResetPasswordRepository return throws', async () => {
        const { sut, resetPasswordStub } = makeSut()
        jest.spyOn(resetPasswordStub, 'reset').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const response = sut.reset(makeFakeRequest())
        await expect(response).rejects.toThrow()
    })
    test('Should ResetPasswordRepository return failed', async () => {
        const { sut, resetPasswordStub } = makeSut()
        jest.spyOn(resetPasswordStub, 'reset').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const response = await sut.reset(makeFakeRequest())
        expect(response).toBe(false)
    })
    test('Should ResetPasswordRepository return success', async () => {
        const { sut } = makeSut()
        const response = await sut.reset(makeFakeRequest())
        expect(response).toBe(true)
    })
})
