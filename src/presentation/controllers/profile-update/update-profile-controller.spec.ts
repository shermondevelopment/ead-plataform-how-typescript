import { UpdateProfileController } from './update-profile-controller'
import { UpdateProfile } from './update-profile-controller-protocols'
import {
    ok,
    serverError
} from '../account-enable/account-active-controller-protocols'
import { UpdateProfileParams } from '../../../domain/usecases/update-profile/update-profile'

interface SutTypes {
    sut: UpdateProfileController
    updateProfileStub: UpdateProfile
}

const makeFakeRequest = () => ({
    body: {
        figure: 'any_profile'
    },
    accountId: 'any_id'
})

const makeUpdateProfileStub = (): UpdateProfile => {
    class UpdateProfileStub implements UpdateProfile {
        async setProfile(profile: UpdateProfileParams): Promise<string> {
            return new Promise((resolved) => resolved('new_profile'))
        }
    }
    return new UpdateProfileStub()
}

const makeSut = (): SutTypes => {
    const updateProfileStub = makeUpdateProfileStub()
    const sut = new UpdateProfileController(updateProfileStub)
    return {
        sut,
        updateProfileStub
    }
}

describe('UpdateProfile Controller', () => {
    test('Should call UpdateProfile how correct values', async () => {
        const { sut, updateProfileStub } = makeSut()
        const spyUpdateProfile = jest.spyOn(updateProfileStub, 'setProfile')
        await sut.handle(makeFakeRequest())
        expect(spyUpdateProfile).toHaveBeenCalledWith({
            profile: 'any_profile',
            id: 'any_id'
        })
    })
    test('Should return 500 if UpdateProfile return throws', async () => {
        const { sut, updateProfileStub } = makeSut()
        jest.spyOn(updateProfileStub, 'setProfile').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 200 if UpdateProfile return success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok('new_profile'))
    })
})
