import { AddMaterial } from '../../../domain/usecases/materials/add-material'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import {
    ok,
    serverError
} from '../account/account-enable/account-active-controller-protocols'

export class AddMAterialController implements Controller {
    constructor(private readonly addMaterials: AddMaterial) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { title, figure: url, order, moduleId } = httpRequest.body
            const materials = await this.addMaterials.add({
                title,
                url,
                order,
                moduleId
            })
            return ok(materials)
        } catch (error) {
            return serverError(error)
        }
    }
}
