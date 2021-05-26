import { Repository } from 'typeorm'
import Accounts from '../entity/accounts'
import { MysqlHelper } from '../helpers/mysql-helper'
import { AccountMongoRepository } from './account-mysql-repository'

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
            password: 'any_password',
            token: 'any_token'
        })
        await accountRepository.save(signup)
        const account = await sut.loadByEmail('any_email@mail.com')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
    })
    test('Should return null if loadByEmail fails', async () => {
        const sut = makeSut()
        const account = await sut.loadByEmail('any_email@mail.com')
        expect(account).toBeFalsy()
    })
    test('Should update the account accessToken on updateAccessToken success', async () => {
        const sut = makeSut()
        const res = accountRepository.create({
            name: 'any_name',
            email: 'any_email@mail.com',
            sexo: 'M',
            password: 'any_password'
        })
        await accountRepository.save(res)
        await sut.update(res.id, 'any_token')
        const account = await accountRepository.findOne({ id: res.id })
        expect(account).toBeTruthy()
        expect(account.token).toBe('any_token')
    })
    test('Should return an account on loadByToken without role', async () => {
        const sut = makeSut()
        const signup = accountRepository.create({
            name: 'any_name',
            email: 'any_email@mail.com',
            sexo: 'M',
            password: 'any_password',
            token: 'any_token',
            role: 'any_role'
        })
        await accountRepository.save(signup)
        const account = await sut.loadByToken('any_token', 'any_role')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
    })
    test('Should return an account on loadByToken with role', async () => {
        const sut = makeSut()
        const signup = accountRepository.create({
            name: 'any_name',
            email: 'any_email@mail.com',
            sexo: 'M',
            password: 'any_password',
            token: 'any_token',
            role: 'any_role'
        })
        await accountRepository.save(signup)
        const account = await sut.loadByToken('any_token', 'any_role')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
    })
    test('Should return null if loadByToken  fails', async () => {
        const sut = makeSut()
        const account = await sut.loadByToken('any_email@mail.com')
        expect(account).toBeFalsy()
    })
})
