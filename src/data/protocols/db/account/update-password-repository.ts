import { UpdatePasswordParams } from '../../../../domain/usecases/account/update-password/update-password'

export interface UpdatePasswordRepository {
    updatePassword(params: Partial<UpdatePasswordParams>): Promise<boolean>
}
