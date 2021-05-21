import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import {
    AccountModel,
    AddAccountModel
} from '../../../../presentation/controllers/signup/signup-protocols'
import { MysqlHelper } from '../helpers/mysql-helper'
import Accounts from '../entity/accounts'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountRepository = MysqlHelper.getRepository(Accounts)
        const account = accountRepository.create(accountData)
        await accountRepository.save(account)
        return account
    }
}
