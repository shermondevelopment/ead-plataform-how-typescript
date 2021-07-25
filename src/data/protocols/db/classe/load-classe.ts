export interface LoadClassesRepository {
    loadClass(userId: string, moduleId: string): Promise<any>
}
