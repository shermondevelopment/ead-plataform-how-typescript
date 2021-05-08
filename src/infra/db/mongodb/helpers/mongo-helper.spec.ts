import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
    beforeAll(async () => {
        await sut.connect(
            'mongodb://brainly:f5ebd24742cd9ce92827835d32f748b9@localhost:32824/admin'
        )
    })
    afterAll(async () => {
        await sut.disconnect()
    })
    test('Should reconnect if mongodb is down', async () => {
        const accountCollection = sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()
        expect(accountCollection).toBeTruthy()
    })
})
