import request from 'supertest'
import app from '../config/app'
import { MysqlHelper } from '../../infra/db/mysql/helpers/mysql-helper'
import Accounts from '../../infra/db/mysql/entity/accounts'

describe('Signin Routes', () => {
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

    describe('POST /signup', () => {
        test('Should return 200 account on signup', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'victor',
                    email: 'victorshermon@yahoo.com',
                    sexo: 'M',
                    password: '123'
                })
                .expect(200)
        })
    })
})
