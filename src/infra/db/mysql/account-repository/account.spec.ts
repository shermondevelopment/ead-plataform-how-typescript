import Accounts from '../entity/accounts'
import { MysqlHelper } from '../helpers/mysql-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MysqlHelper.connect()
    })

    afterAll(async () => {
        await MysqlHelper.disconnect()
    })

    beforeEach(async () => {
        const accountCollection = MysqlHelper.getRepository(Accounts)
        await accountCollection.delete({ name: 'any_name' })
    })

    test('should connect to mongodb', async () => {
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
})
