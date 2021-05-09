import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
    beforeAll(async () => {
        await sut.connect(
            `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@localhost:${process.env.MONGO_DB_PORT}/admin`
        )
    })
    afterAll(async () => {
        await sut.disconnect()
    })
    test('Should reconnect if mongodb is down', async () => {
        const accountCollection = sut.getCollection('users')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()
        expect(accountCollection).toBeTruthy()
    })
})
