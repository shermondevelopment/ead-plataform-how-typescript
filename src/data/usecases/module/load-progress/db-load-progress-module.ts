import {
    LoadProgress,
    LoadProgressRequest,
    LoadProgressResponse,
    LoadProgressRepository
} from './db-load-progress-module-protocols'

export class DbLoadProgress implements LoadProgress {
    constructor(
        private readonly loadProgressRepository: LoadProgressRepository
    ) {}

    async load(loadParams: LoadProgressRequest): Promise<LoadProgressResponse> {
        const progress = await this.loadProgressRepository.loadProgress(
            loadParams
        )
        return progress
    }
}
