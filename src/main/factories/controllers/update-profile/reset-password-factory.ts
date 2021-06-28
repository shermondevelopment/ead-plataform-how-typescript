import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AccountMongoRepository } from '../../../../infra/db/mysql/account/account-mysql-repository'
import { DbUpdateProfile } from '../../../../data/usecases/account/update-profile/db-update-profile'
import { UpdateProfileController } from '../../../../presentation/controllers/account/profile-update/update-profile-controller'

export const makeUpdateProfile = (): Controller => {
    const controller = new UpdateProfileController(
        new DbUpdateProfile(new AccountMongoRepository())
    )
    return makeLogControllerDecorator(controller)
}
