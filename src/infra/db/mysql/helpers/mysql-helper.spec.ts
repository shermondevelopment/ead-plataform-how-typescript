import { MysqlHelper as sut } from './mysql-helper'
import Accounts from '../entity/accounts'

describe('Mongo Helper', () => {
    beforeAll(async () => {
        await sut.connect()
    })
    afterAll(async () => {
        await sut.disconnect()
    })
    test('Should reconnect if mongodb is down', async () => {
        const accountsRepository = await sut.getRepository(Accounts)
        expect(accountsRepository).toBeTruthy()
        await sut.disconnect()
        expect(accountsRepository).toBeTruthy()
    })
})
