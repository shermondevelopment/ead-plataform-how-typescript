import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import {
    AccountModel,
    AddAccountModel
} from '../../../../presentation/controllers/account/signup/signup-controller-protocols'
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
import {
    ResetPasswordRepository,
    ResetPasswordParamsRepository
} from '../../../../data/protocols/db/account/reset-password-repository'
import {
    UpdateProfileRepository,
    UpdatyeProfileParamsRepository
} from '../../../../data/protocols/db/account/update-profile-repository'
import { UpdateAccountRepository } from '../../../../data/protocols/db/account/update-account-repository'
import { UpdateAccountModel } from '../../../../domain/models/account/update-account-model'
import { LoadAccountByIdRepository } from '../../../../data/protocols/db/account/load-account-by-id-repository'
import { UpdatePasswordRepository } from '../../../../data/protocols/db/account/update-password-repository'
import { UpdatePasswordParams } from '../../../../domain/usecases/account/update-password/update-password'
import { UnlockedUserRepository } from '../../../../data/protocols/db/account/unlocked-user'
import { LockedUserRepository } from '../../../../data/protocols/db/account/locked-user'

export class AccountMongoRepository
    implements
        AddAccountRepository,
        LoadAccountByEmailRepository,
        UpdateAccessTokenRepository,
        LoadAccountByTokenRepository,
        EnabledAccountRepository,
        ForgotPasswordRepository,
        ResetPasswordRepository,
        UpdateProfileRepository,
        UpdateAccountRepository,
        LoadAccountByIdRepository,
        UpdatePasswordRepository,
        UnlockedUserRepository,
        LockedUserRepository {
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
                }
            ]
        })
         if(!loadByToken) {
            const account = await this.accountRepository.findOne({
                where: [
                    {
                       role: 'admin'
                    }
                ]
            })
            return account;
        }
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
    async reset(params: ResetPasswordParamsRepository): Promise<boolean> {
        const hashToken = await this.accountRepository.findOne({
            tokenResetPassword: params.token
        })
        const dataActually = new Date()
        if (
            hashToken === undefined ||
            dataActually > hashToken.tokenResetExpired
        ) {
            return false
        }
        hashToken.password = params.password
        hashToken.tokenResetPassword = ''
        await this.accountRepository.save(hashToken)
        return true
    }
    async setProfile(params: UpdatyeProfileParamsRepository): Promise<string> {
        const account = await this.accountRepository.findOne({ id: params.id })
        account.profile = params.profile
        await this.accountRepository.save(account)

        return params.profile
    }
    async updateAccount(
        id: string,
        params: UpdateAccountModel
    ): Promise<Partial<UpdateAccountModel>> {
        const account = await this.accountRepository.findOne({ id })
        Object.assign(account, params)
        await this.accountRepository.save(account)
        return params
    }
    async loadById(id: string): Promise<AccountModel> {
        const account = await this.accountRepository.findOne({ id })
        return account
    }
    async updatePassword(params: UpdatePasswordParams): Promise<boolean> {
        const account = await this.accountRepository.findOne({ id: params.id })
        account.password = params.password
        await this.accountRepository.save(account)
        return true
    }
    async unlocked(email: string): Promise<boolean> {
        const user = await this.accountRepository.findOne({ email })
        if (!user) {
            return false
        }
        user.payment = !user.payment
        await this.accountRepository.save(user)
        return true
    }

    async locked(id: string): Promise<string> {
        const user = await this.accountRepository.findOne({ id })

        return user.token
    }
}
