import { LoadClassFromModule } from '../../../../domain/usecases/module/load-class-from-module'
import { LoadClassRepository } from '../../../protocols/db/module/load-class-from-module'

export class DbLoadClassFromModule implements LoadClassFromModule {
    constructor(private readonly loadClassFromModule: LoadClassRepository) {}

    async loadClass(userId: string, moduleId: string): Promise<any> {
        const classes = await this.loadClassFromModule.loadClass(
            userId,
            moduleId
        )
        return classes
    }
}
