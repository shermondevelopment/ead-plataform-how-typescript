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
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import {
    EnabledAccountRepository,
    TokenRepository
} from '../../../../data/protocols/db/account/enable-account-repository'
import {
    ForgotPasswordRepository,
    ForgotPasswordRequestRepository
} from '../../../../data/protocols/db/account/forgot-password-repository'

export class AccountMongoRepository
    implements
        AddAccountRepository,
        LoadAccountByEmailRepository,
        UpdateAccessTokenRepository,
        LoadAccountByTokenRepository,
        EnabledAccountRepository,
        ForgotPasswordRepository {
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

    async loadByToken(token: string, role?: string): Promise<AccountModel> {
        const loadByToken = await this.accountRepository.findOne({
            where: [
                {
                    token,
                    role
                },
                {
                    role: 'admin'
                }
            ]
        })
        return loadByToken
    }

    async enabled(code: TokenRepository): Promise<boolean> {
        const findToken = await this.accountRepository.findOne({
            token_account: code.token
        })
        if (!findToken) {
            return false
        }
        findToken.status = true
        await this.accountRepository.save(findToken)
        return true
    }
    async request(data: ForgotPasswordRequestRepository): Promise<boolean> {
        const { tokenResetPassword, tokenResetExpired, email } = data
        const account = await this.accountRepository.findOne({
            email
        })
        if (!account) {
            return false
        }

        await this.accountRepository.update(
            { id: account.id },
            {
                tokenResetPassword,
                tokenResetExpired: new Date(tokenResetExpired)
            }
        )
        return true
    }
}
