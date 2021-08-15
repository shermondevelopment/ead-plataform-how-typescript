export interface UnlockedUser {
    unlocked(email: string): Promise<boolean>
}
