import request from 'supertest'
import app from '../config/app'
import { MysqlHelper } from '../../infra/db/mysql/helpers/mysql-helper'
import Accounts from '../../infra/db/mysql/entity/accounts'

describe('Signup Routes', () => {
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

    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Victor',
                email: 'victorshermon@yahoo.com',
                sexo: 'M',
                password: '123'
            })
            .expect(200)
    })
})
