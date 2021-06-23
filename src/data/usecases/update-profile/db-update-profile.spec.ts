import {
    UpdateProfileRepository,
    UpdatyeProfileParamsRepository
} from '../../protocols/db/account/update-profile-repository'
import { DbUpdateProfile } from './db-update-profile'

interface SutTypes {
    sut: DbUpdateProfile
    updateProfileRepository: UpdateProfileRepository
}

const makeUpdateProfileRepositoryStub = (): UpdateProfileRepository => {
    class UpdateProfileRepositoryStub implements UpdateProfileRepository {
        async setProfile(
            profile: UpdatyeProfileParamsRepository
        ): Promise<string> {
            return new Promise((resolved) => resolved('new_profile'))
        }
    }
    return new UpdateProfileRepositoryStub()
}

const makeSut = (): SutTypes => {
    const updateProfileRepository = makeUpdateProfileRepositoryStub()
    const sut = new DbUpdateProfile(updateProfileRepository)
    return {
        sut,
        updateProfileRepository
    }
}

const fakeAddProfile = () => ({
    profile: 'any_profile',
    id: 'any_id'
})

describe('DbpdateProfile file', () => {
    test('Should call UpdateAccountRepository how correct values', async () => {
        const { sut, updateProfileRepository } = makeSut()
        const spyUpdateProfile = jest.spyOn(
            updateProfileRepository,
            'setProfile'
        )
        await sut.setProfile(fakeAddProfile())
        expect(spyUpdateProfile).toHaveBeenCalledWith(fakeAddProfile())
    })
    test('Should thows UpdateAccountRepository return thows', async () => {
        const { sut, updateProfileRepository } = makeSut()
        jest.spyOn(updateProfileRepository, 'setProfile').mockReturnValueOnce(
            new Promise((resolved, reject) => reject(new Error()))
        )
        const promise = sut.setProfile(fakeAddProfile())
        await expect(promise).rejects.toThrow()
    })
    test('Should  UpdateAccountRepository return success', async () => {
        const { sut } = makeSut()
        const response = await sut.setProfile(fakeAddProfile())
        await expect(response).toEqual('new_profile')
    })
})
