import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
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
