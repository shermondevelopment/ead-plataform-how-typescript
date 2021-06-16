import { DbAccountEnable } from './db-account-enable'
import {
    EnabledAccountRepository,
    TokenRepository
} from '../../protocols/db/account/enable-account-repository'
import { Token } from '../../../domain/usecases/active-account/active-account'

interface SutTypes {
    sut: DbAccountEnable
    enabledAccountRepository: EnabledAccountRepository
}

const makeFakeDbEnableAccountRepository = (): EnabledAccountRepository => {
    class DbEnableAccountRepository implements EnabledAccountRepository {
        async enabled(token: TokenRepository): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new DbEnableAccountRepository()
}

const makeSut = (): SutTypes => {
    const enabledAccountRepository = makeFakeDbEnableAccountRepository()
    const sut = new DbAccountEnable(enabledAccountRepository)
    return {
        sut,
        enabledAccountRepository
    }
}

describe('DbAccountEnable UseCase', () => {
    test('Should call DbAccountEnabled how correct values', async () => {
        const { sut, enabledAccountRepository } = makeSut()
        const spyEnableAccount = jest.spyOn(enabledAccountRepository, 'enabled')
        const makeFakeData = {
            token: 'valid_token'
        }
        await sut.enabled(makeFakeData)
        expect(spyEnableAccount).toHaveBeenCalledWith(makeFakeData)
    })
    test('Should if DbAccountEnabled return false', async () => {
        const { sut, enabledAccountRepository } = makeSut()
        jest.spyOn(enabledAccountRepository, 'enabled').mockReturnValueOnce(
            new Promise((resolved) => resolved(false))
        )
        const makeFakeData = {
            token: 'invalid_token'
        }
        const promise = await sut.enabled(makeFakeData)
        expect(promise).toBe(false)
    })
    test('Should if DbAccountEnabled return throws', async () => {
        const { sut, enabledAccountRepository } = makeSut()
        jest.spyOn(enabledAccountRepository, 'enabled').mockReturnValueOnce(
            new Promise((resolved, rejects) => rejects(new Error()))
        )
        const makeFakeData = {
            token: 'invalid_token'
        }
        const promise = sut.enabled(makeFakeData)
        await expect(promise).rejects.toThrow()
    })
    test('Should if DbAccountEnabled return success', async () => {
        const { sut } = makeSut()
        const makeFakeData = {
            token: 'valid_token'
        }
        const promise = await sut.enabled(makeFakeData)
        expect(promise).toBe(true)
    })
})
