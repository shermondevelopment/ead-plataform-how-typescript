import { LoadClass } from '../../../../domain/usecases/classes/load-classe'
import { LoadClassesRepository } from '../../../protocols/db/classe/load-classe'

export class DbLoadClass implements LoadClass {
    constructor(private readonly loadClasseRepository: LoadClassesRepository) {}

    async load(userId: string, moduleId: string): Promise<any> {
        const classes = await this.loadClasseRepository.loadClass(
            userId,
            moduleId
        )
        return classes
    }
}
