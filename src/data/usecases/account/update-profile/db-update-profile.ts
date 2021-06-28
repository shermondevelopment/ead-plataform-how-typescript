import { UpdateProfile } from '../../../../domain/usecases/account/update-profile/update-profile'
import {
    UpdateProfileRepository,
    UpdatyeProfileParamsRepository
} from '../../../protocols/db/account/update-profile-repository'

export class DbUpdateProfile implements UpdateProfile {
    constructor(
        private readonly updateProfilerepository: UpdateProfileRepository
    ) {}
    async setProfile(params: UpdatyeProfileParamsRepository): Promise<string> {
        const newProfile = await this.updateProfilerepository.setProfile({
            profile: params.profile,
            id: params.id
        })
        return newProfile
    }
}
