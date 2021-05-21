import { Repository } from 'typeorm'
import Accounts from '../entity/accounts'
import { MysqlHelper } from '../helpers/mysql-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

let accountRepository: Repository<Accounts>

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MysqlHelper.connect()
    })

    afterAll(async () => {
        await MysqlHelper.disconnect()
    })

    beforeEach(async () => {
        accountRepository = MysqlHelper.getRepository(Accounts)
        await accountRepository.delete({ name: 'any_name' })
    })

    test('Should return an account on add success', async () => {
        const sut = makeSut()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@mail.com',
            sexo: 'M',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
    })
    test('Should return an account on loadByEmail success', async () => {
        const sut = makeSut()
        const signup = accountRepository.create({
            name: 'any_name',
            email: 'any_email@mail.com',
            sexo: 'M',
            password: 'any_password'
        })
        await accountRepository.save(signup)
        const account = await sut.loadByEmail('any_email@mail.com')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
    })
})
