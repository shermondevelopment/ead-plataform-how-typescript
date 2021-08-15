import { LockedUser } from '../../../../domain/usecases/account/locked-user/locked-user'
import { LockedUserRepository } from '../../../protocols/db/account/locked-user'

export class DbLockedUser implements LockedUser {
    constructor(private readonly lockedUserRepository: LockedUserRepository) {}

    async locked(id: string): Promise<string> {
        const token = await this.lockedUserRepository.locked(id)
        return token
    }
}
