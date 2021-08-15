import { UnlockedUser } from '../../../../domain/usecases/account/unlocked-user/unlocked-user'
import { UnlockedUserRepository } from '../../../protocols/db/account/unlocked-user'

export class DbUnlockedUser implements UnlockedUser {
    constructor(
        private readonly unlockedUserRepository: UnlockedUserRepository
    ) {}

    async unlocked(email: string): Promise<boolean> {
        await this.unlockedUserRepository.unlocked(email)
        return true
    }
}
