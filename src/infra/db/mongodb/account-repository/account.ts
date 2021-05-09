import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import {
    AccountModel,
    AddAccountModel
} from '../../../../presentation/controllers/signup-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('users')
        const result = await accountCollection.insertOne(accountData)
        return MongoHelper.map(result.ops[0])
    }
}
