export interface LockedUserRepository {
    locked(id: string): Promise<string>
}
