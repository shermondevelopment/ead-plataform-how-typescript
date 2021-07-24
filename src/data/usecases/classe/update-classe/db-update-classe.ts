import { UpdateClasse } from '../../../../domain/usecases/classes/update-classe'
import { UpdateClasseRepository } from '../../../protocols/db/classe/update-classe'
import { AddClasseModel, Slug } from '../add-classe/db-add-classe-protocols'

export class DbUpdateClasse implements UpdateClasse {
    constructor(
        private readonly slug: Slug,
        private readonly updateClasseRepository: UpdateClasseRepository
    ) {}

    async update(
        idClasse: string,
        params: Partial<AddClasseModel>
    ): Promise<any> {
        if (params.title) {
            const slug = this.slug.transform(params.title)
            await this.updateClasseRepository.update(idClasse, {
                ...params,
                slug
            })
            return null
        }
        await this.updateClasseRepository.update(idClasse, params)
        return null
    }
}
