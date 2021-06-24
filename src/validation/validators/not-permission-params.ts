import { DataNotExists } from '../../presentation/erros'
import { Validation } from '../../presentation/protocols/validation'

export class NotRequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) {}
    validate(input: any): Error {
        if (input[this.fieldName]) {
            return new DataNotExists(
                `parâmetro ${this.fieldName} não permitido`
            )
        }
    }
}
