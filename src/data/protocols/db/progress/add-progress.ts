import { AddProgressModel } from '../../../../domain/usecases/progress/add-progress'

export interface AddProgressRepository {
    add(params: AddProgressModel): Promise<any>
}
