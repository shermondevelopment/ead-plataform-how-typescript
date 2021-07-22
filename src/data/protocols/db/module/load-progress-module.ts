import { LoadProgressResponse } from '../../../../domain/models/module/load-progress-module'
import { LoadProgressRequest } from '../../../../domain/usecases/module/load-progress-module'

export interface LoadProgressRepository {
    loadProgress(paramsLoad: LoadProgressRequest): Promise<LoadProgressResponse>
}
