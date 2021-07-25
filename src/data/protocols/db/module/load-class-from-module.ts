export interface LoadClassRepository {
    loadClass(userId: string, moduleId: string): Promise<any>
}
