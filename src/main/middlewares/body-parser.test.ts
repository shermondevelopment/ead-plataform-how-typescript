import request from 'supertest'
import app from '../config/app'

describe('Should parser body as json', () => {
    test('', async () => {
        app.post('/test_body_parser', (req, res) => {
            res.send(req.body)
        })
        await request(app)
            .post('/test_body_parser')
            .send({ name: 'Victor' })
            .expect({ name: 'Victor' })
    })
})
