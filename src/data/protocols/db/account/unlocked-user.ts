export interface UnlockedUserRepository {
    unlocked(email: string): Promise<boolean>
}
