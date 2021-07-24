import {
    Slug,
    AddClasseRepository,
    ClasseModel,
    AddClasse,
    AddClasseModel
} from './db-add-classe-protocols'

export class DbAddClasse implements AddClasse {
    constructor(
        private readonly slug: Slug,
        private readonly addClasseRepository: AddClasseRepository
    ) {}

    async add(params: AddClasseModel): Promise<ClasseModel> {
        const slug = this.slug.transform(params.title)
        const classe = await this.addClasseRepository.add({ ...params, slug })
        return classe
    }
}
