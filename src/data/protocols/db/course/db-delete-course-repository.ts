import {
    DeleteParam,
    ReturnDelete
} from '../../../../domain/usecases/delete-course/delete'

export interface DeleteRepository {
    delete(param: DeleteParam): Promise<ReturnDelete>
}
