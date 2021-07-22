import {
    AddProgressRepository,
    AddProgressModel,
    AddProgress
} from './db-add-progress-protocols'

export class DbAddProgress implements AddProgress {
    constructor(
        private readonly addProgressRepository: AddProgressRepository
    ) {}

    async add(params: AddProgressModel): Promise<any> {
        const progress = await this.addProgressRepository.add(params)
        return progress
    }
}
