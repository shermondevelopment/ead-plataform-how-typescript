import { ActiveAccountController } from './account-active-controller'
import {
    ActiveAccount,
    Token
} from '../../../domain/usecases/active-account/active-account'

const fakeRequest = () => ({
    query: {
        token: 'any_token'
    }
})

const makeFakeActiveAccount = (): ActiveAccount => {
    class ActiveAccountStub implements ActiveAccount {
        async accountActive(token: Token): Promise<boolean> {
            return new Promise((resolved) => resolved(true))
        }
    }
    return new ActiveAccountStub()
}

describe('Active Account', () => {
    test('Should call accountActive how correct values', async () => {
        const activeAccount = makeFakeActiveAccount()
        const spyActiveAccount = jest.spyOn(activeAccount, 'accountActive')
        const sut = new ActiveAccountController(activeAccount)
        await sut.handle(fakeRequest())
        expect(spyActiveAccount).toHaveBeenCalledWith({ token: 'any_token' })
    })
})
