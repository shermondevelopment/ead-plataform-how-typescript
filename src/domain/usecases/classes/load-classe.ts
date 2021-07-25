export interface LoadClass {
    load(userId: string, moduleId: string): Promise<any>
}
