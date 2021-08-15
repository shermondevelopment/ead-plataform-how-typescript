export interface LockedUser {
    locked(id: string): Promise<string>
}
