import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import {
    AccountModel,
    AddAccountModel
} from '../../../../presentation/controllers/signup/signup-controller-protocols'
import { MysqlHelper } from '../helpers/mysql-helper'
import Accounts from '../entity/accounts'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { Repository } from 'typeorm'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { LoadAccountByToken } from '../../../../presentation/middlewares/auth-middleware-protocols'

export class AccountMongoRepository
    implements
        AddAccountRepository,
        LoadAccountByEmailRepository,
        UpdateAccessTokenRepository,
        LoadAccountByToken {
    private accountRepository: Repository<Accounts>

    constructor() {
        this.accountRepository = MysqlHelper.getRepository(Accounts)
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const account = this.accountRepository.create(accountData)
        await this.accountRepository.save(account)
        return account
    }

    async loadByEmail(email: string): Promise<AccountModel> {
        const loadByEmail = await this.accountRepository.findOne({ email })
        return loadByEmail
    }

    async update(id: string, token: string): Promise<void> {
        await this.accountRepository.update(id, { token })
    }

    async load(token: string, role?: string): Promise<AccountModel> {
        const loadByToken = await this.accountRepository.findOne({
            where: {
                token,
                role
            }
        })
        return loadByToken
    }
}
