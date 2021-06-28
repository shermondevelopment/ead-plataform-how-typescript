import { UpdatePasswordParams } from '../../../../domain/usecases/update-password/update-password'

export interface UpdatePasswordRepository {
    updatePassword(params: Partial<UpdatePasswordParams>): Promise<boolean>
}
