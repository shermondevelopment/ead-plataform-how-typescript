export interface LoadClassFromModule {
    loadClass(idUser: string, moduleId: string): Promise<any>
}
