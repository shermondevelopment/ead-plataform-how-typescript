import { LoadProgressResponse } from '../../models/module/load-progress-module'

export interface LoadProgressRequest {
    user_id: string
    disciplineId: string
}

export interface LoadProgress {
    load(loadParams: LoadProgressRequest): Promise<LoadProgressResponse>
}
